const { SlashCommandBuilder, REST, Routes} = require('discord.js');
const path = require("node:path");
const fs = require("node:fs");
require('dotenv').config({ path: "../.env"})


module.exports = {
    data: new SlashCommandBuilder()
        .setName('deploy-guild-commands')
        .setDescription('Deploy Discord Guild Commands!'),
    async execute(interaction) {

        await interaction.deferReply()

        const guildCommands = [];

        const guildFoldersPath = __dirname
        const guildCommandFolders = fs.readdirSync(guildFoldersPath).filter(file => file.endsWith('.js'));
        for (const file of guildCommandFolders) {
            const guildFilePath = path.join(guildFoldersPath, file);
            const guildCommand = require(guildFilePath);
            if ('data' in guildCommand && 'execute' in guildCommand) {
                guildCommands.push(guildCommand.data.toJSON());
            } else {
                await interaction.followUp({content: `Command at ${guildFilePath} is incomplete!`})
            }
        }


        const rest = new REST().setToken(process.env.BOT_TOKEN);

        await (async () => {
            try {
                const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    {body: guildCommands})

                await interaction.followUp({content: `Loaded ${data.length} guild commands successfully!`})
            } catch (error) {
                await interaction.followUp({content: error})
            }
        })()






    }
};