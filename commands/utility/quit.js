const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

/**
 * Shut down the bot, disconnecting voice if needed.
 */

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quit')
		.setDescription('Shutdown this bot'),
	async execute(interaction) {
        await interaction.reply("Nap time!");
        const connection = getVoiceConnection(interaction.guildId);
        if (connection) {
            await connection.destroy();
        }
		interaction.client.destroy();
	},
};