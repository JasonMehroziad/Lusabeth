const { Events } = require('discord.js');
const { getVoiceConnection, joinVoiceChannel } = require('@discordjs/voice');
const { voiceChannelId } = require('../config.json');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        if (newState.member.user.bot) return;
        if (oldState.channelId && oldState.channel.members.filter((member) => !member.user.bot).size === 0) {
            const connection = getVoiceConnection(oldState.guild.id);
            if (connection) {
                await connection.destroy();
            }
        }
        if (newState.channelId && !getVoiceConnection(newState.guild.id)) {
            await joinVoiceChannel({
                channelId: newState.channel.id,
                guildId: newState.guild.id,
                adapterCreator: newState.guild.voiceAdapterCreator,
                selfDeaf: false,
            });
        }
    }
};