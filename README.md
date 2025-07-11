# Lusabot AI

Lusabot is a language model Discord bot written in Javascript. The purpose of this project is to create a locally hosted bot that can demonstrate the latest AI driven features in a cohesive manner. Lusabot acts as a member of the community they are invited to, with the following capabilities implemented or planned: 

* Generates text responses to server messages in line with defined character of Lusabeth
* Joins voice channels and responds to voice messages using a custom trained voice model 
* Recognizes images and responds to shared pictures
* Uses Discord features such as emoji and the soundboard



## Running Lusabot

Lusabot is currently in development but can be hosted by anyone by pulling this repository and fulfilling the following dependencies.

### Language Model 

Lusabot is locally hosted using [Ollama](https://github.com/ollama/ollama). Install and launch Ollama to act as the local language model server. Lusabot has a custom local language model defined with [OllamaJS](https://github.com/ollama/ollama-js). Edit the model.json to update Lusabot's parameters and even define a completely new character for it to act as.

### Discord Bot

Lusabot must be added to a Discord server by [creating a new bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) and [inviting it to your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).

Additionally, define a config.json with the following fields for your server:
```
{
    "token": "", 
    "clientId": "", 
    "textChannelId": "", 
    "modelName": "lusabeth"
}
```
Token and client ID can be pulled from the [Discord developer portal](https://discord.com/developers). Text channel ID can be found by enabling developer mode on Discord.

### NodeJS 

Lusabot is developed in [NodeJS](https://nodejs.org/en), so all dependencies can be pulled using npm. Once the server is running and the bot is invited to a server, run with
```
node index.js
```
The initial response will take a noticeable amount of time as the language model is loaded. 

## Future Development

The text to speech functionality for Lusabot is currently in development. Once the core features are complete, a batch executable will be available to check and run dependencies to reduce the hassle of setup. Lusabot may also be publicly hosted to allow anyone to invite it to their server without any of the above setup.