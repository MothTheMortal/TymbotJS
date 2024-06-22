const { REST, Routes} = require('discord.js');
const path = require("node:path");
const fs = require("node:fs");
require('dotenv').config({ path: "../.env"})


const guildCommands = [];


const guildFoldersPath = path.join(__dirname, 'guild_commands')
const guildCommandFolders = fs.readdirSync(guildFoldersPath).filter(file => file.endsWith('.js'));
for (const file of guildCommandFolders) {
    const guildFilePath = path.join(guildFoldersPath, file);
    const guildCommand = require(guildFilePath);
    if ('data' in guildCommand && 'execute' in guildCommand) {
        guildCommands.push(guildCommand.data.toJSON());
    } else {
        console.log(`Command at ${guildFilePath} is incomplete!`)
    }
}


const rest = new REST().setToken(process.env.BOT_TOKEN);


(async () => {
    try {
        console.log(`Loading ${guildCommands.length} guild commands.`)

        const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: guildCommands})

        console.log(`Loaded ${data.length} guild commands successfully!`)
    } catch (error) {
        console.error(error)
    }
})()



