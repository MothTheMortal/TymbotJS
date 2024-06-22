const { SlashCommandBuilder, REST, Routes} = require('discord.js');
const path = require("node:path");
const fs = require("node:fs");
require('dotenv').config({ path: "../.env"})


module.exports = {
    data: new SlashCommandBuilder()
        .setName('deploy-commands')
        .setDescription('Deploy Discord Commands!'),
    async execute(interaction) {
        await interaction.deferReply()

        const commands = [];

        const foldersPath = __dirname
        const commandFolders = fs.readdirSync(__dirname).filter(file => file.endsWith(".js"));

        for (const file of commandFolders) {
            const filePath = path.join(foldersPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                await interaction.followUp({content: `Command at ${filePath} is incomplete!`})
            }
        }

        const rest = new REST().setToken(process.env.BOT_TOKEN);

        await (async () => {
            try {
                const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID),
                    {body: commands})

                await interaction.followUp({content: `Loaded ${data.length} commands successfully!`})
            } catch (error) {
                await interaction.followUp({content: error})
            }
        })()






    }
};