const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

/**
 * Connect to the provided voice channel. If none are provided, 
 * join the channel the user is in, if any.
 * @param channel (optional) voice channel to connect to.
 */

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('Connects to voice chat')
		.addChannelOption(option => 
			option.setName('channel')
				  .setDescription('The channel to join')),
	async execute(interaction) {
		const targetChannel = interaction.options.getChannel('channel');
		const targetChannelId = (targetChannel && targetChannel.isVoiceBased) ? targetChannel.id : interaction.member.voice.channelId;
		if (!targetChannelId) {
			await interaction.reply("There's no channel to join! Join or provide a channel for me to join!");
		} else {
			await joinVoiceChannel({
				channelId: targetChannelId,
				guildId: interaction.guildId,
				adapterCreator: interaction.guild.voiceAdapterCreator,
				selfDeaf: false,
			});
			await interaction.reply({content: 'Joined voice channel!', flags: MessageFlags.Ephemeral});
		}
	},
};