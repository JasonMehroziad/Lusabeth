const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const loadCommands = require('./helpers/loadCommands');
const loadEvents = require('./helpers/loadEvents');
const loadModel = require('./helpers/loadModel');

/**
 * Bot main. Init commands and event listeners.
 */

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
const chatHistory = [];
module.exports = chatHistory;

// Load defined commands
client.commands = new Collection();
loadCommands(client.commands);
// Load defined event listeners
loadEvents(client);
// Load the local language model
loadModel();

client.login(token);
