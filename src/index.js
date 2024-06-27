const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')
const mongoose = require('mongoose');
const discordBotModel = require('../src/models/discordBot.model')
const {reminderTask} = require("./utils/remindersHandler");

require('dotenv').config();

mongoose.connect(process.env.MONGODB)

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildMessageReactions
    ]
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath).filter(file => file.endsWith(".js"));

for (const file of commandFolders) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    if (('data' in command && 'execute' in command) || ('context' in command && 'data' in command)) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Command at ${filePath} is incomplete!`)
    }
}

const guildFoldersPath = path.join(__dirname, 'guild_commands')
const guildCommandFolders = fs.readdirSync(guildFoldersPath).filter(file => file.endsWith('.js'));

for (const file of guildCommandFolders) {
    const guildFilePath = path.join(guildFoldersPath, file);
    const guildCommand = require(guildFilePath);
    if ('data' in guildCommand && 'execute' in guildCommand) {
        client.commands.set(guildCommand.data.name, guildCommand)
    } else {
        console.log(`Command at ${guildFilePath} is incomplete!`)

    }
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('ready', async () => {
    await reminderTask(client).start()
})

client.login(process.env.BOT_TOKEN);