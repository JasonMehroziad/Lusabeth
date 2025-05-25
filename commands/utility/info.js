const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Provides information about the server or a user')
		.addSubcommand(subcommand => subcommand.setName('server')
					         				   .setDescription('Get info about the server'))
		.addSubcommand(subcommand => subcommand.setName('user')
											   .setDescription('Get info about a user')
					                           .addUserOption(option => option.setName('target')
											   								  .setDescription('Target user'))),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
		} else if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('target');

			if (user) {
				await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
			} else {
				await interaction.reply('Please specify a user');
			}
		}
	},
};