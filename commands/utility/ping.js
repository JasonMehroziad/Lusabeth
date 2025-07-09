const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the latency (ms) for this app'),
	async execute(interaction) {
		const latency = Date.now() - interaction.createdAt;
		if (latency > 100) {
			await interaction.reply("Ping is " + latency + "ms?? Can I have your potato when you replace it?")
		} else {
			await interaction.reply("Ping is " + latency + "ms! Almost as fast as me~")
		}
	},
};