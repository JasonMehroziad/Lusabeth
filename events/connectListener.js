const { Events } = require('discord.js');
const { getVoiceConnection, joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');
const { voiceChannelId } = require('../config.json');

/**
 * Listener for voice channel connections. Used to automatically join voice channels.
 */

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        if (newState.member.user.bot) return;
        // leave vc if all users have left
        if (oldState.channelId && oldState.channel.members.filter((member) => !member.user.bot).size === 0) {
            const connection = getVoiceConnection(oldState.guild.id);
            if (connection) {
                connection.state.subscription.player.stop();
                await connection.destroy();
            }
        }
        // join vc when a user joins if not already part of a vc 
        if (newState.channelId && !getVoiceConnection(newState.guild.id)) {
            const connection = await joinVoiceChannel({
                channelId: newState.channel.id,
                guildId: newState.guild.id,
                adapterCreator: newState.guild.voiceAdapterCreator,
                selfDeaf: false,
            });
            connection.subscribe(createAudioPlayer());
        }
    }
};