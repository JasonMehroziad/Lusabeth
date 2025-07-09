const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { voiceChannelId, guildId } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Connects to voice chat'),
	async execute(interaction) {
		await joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
	},
};