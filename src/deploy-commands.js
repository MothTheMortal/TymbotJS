require('dotenv').config({ path: "../.env"})
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath).filter(file => file.endsWith(".js"));

for (const file of commandFolders) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`Command at ${filePath} is incomplete!`)
    }
}


const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
   try {
       console.log(`Loading ${commands.length} commands.`)

       const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID),
           { body: commands })

        console.log(`Loaded ${data.length} commands successfully!`)
   } catch (error) {
       console.error(error)
   }
})()