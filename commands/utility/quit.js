const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quit')
		.setDescription('Shutdown this bot'),
	async execute(interaction) {
        await interaction.reply("Taking a nap...");
        const connection = getVoiceConnection(interaction.guildId);
        if (connection) {
            await connection.destroy();
        }
		interaction.client.destroy();
	},
};