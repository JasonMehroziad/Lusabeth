const { Events } = require('discord.js');
const { default: ollama } = require('ollama');
const { channelId, modelName } = require('../config.json');
const chatHistory = require('../index.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Only reply to direct mentions excluding itself
        if (message.channelId !== channelId || message.author.bot) return;

        // process input
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
            await message.reply(response.message.content)
                         .then(() => console.log(chatHistory));
        } catch (error) {
            console.error(error);
            message.reply('There was an error replying to this message');
        }
    },
};