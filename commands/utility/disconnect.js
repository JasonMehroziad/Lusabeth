const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnects from voice chat'),
	async execute(interaction) {
        const connection = getVoiceConnection(interaction.guildId);
        if (connection) {
            await connection.destroy();
            await interaction.reply({content: 'Left voice channel!', flags: MessageFlags.Ephemeral});
        }
    },
};