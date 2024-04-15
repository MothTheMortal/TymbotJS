const { SlashCommandBuilder } = require('discord.js');
const authenticate = require('../utils/authRegister')
const authCheck = require('../utils/authCheck')
const status = require("../utils/status")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('integration')
        .setDescription('Authenticate the bot!')
        .addStringOption(option =>
            option.setName("bot_id")
                .setRequired(true)
                .setDescription("Bot ID.")
        ),
    async execute(interaction) {
        await interaction.deferReply();

        if (await authCheck(interaction.guildId)) {
            return await status.integrationAlreadyActive(interaction)
        }

        const botID = interaction.options.getString("bot_id");
        const auth = await authenticate(botID, interaction.guildId);
        await auth(interaction)
    }
};