const { Events } = require('discord.js');
const { default: ollama } = require('ollama');
const { textChannelId, modelName } = require('../config.json');
const chatHistory = require('../index.js');
const { getVoiceConnection, AudioPlayer, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

/**
 * Listener for messages. Used for text interactions and limited to a specific channel.
 */

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Only reply human messages in a config specified channel
        if (message.channelId !== textChannelId || message.author.bot) return;

        // preprocess input
        const content = message.member.displayName +  ": \"" + message.content + "\"";
        try {
            // Add message to chat history
            chatHistory.push({ role: 'user', content: content});
            // Generate response
            const response = await ollama.chat({
                model: modelName,
                messages: chatHistory
            });
            // Add response to chat history then reply
            chatHistory.push({ role: 'assistant', content: response.message.content});
            await message.reply({content: response.message.content})
                         .then(() => console.log(chatHistory));
            // TTS if connected to voice
            const voiceConnection = getVoiceConnection(message.guildId);
            if (voiceConnection) {
                const text = response.message.content.replaceAll(/<(.*?)>/gi, "");
                const speech = await fetch("http://localhost:5000", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({"text": text})
                });
                const audio = createAudioResource(speech.body);
                voiceConnection.state.subscription.player.play(audio);
            }
        } catch (error) {
            console.error(error);
            message.reply('There was an error replying to this message');
        }
    },
};