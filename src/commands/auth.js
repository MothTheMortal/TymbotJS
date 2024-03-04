const { SlashCommandBuilder } = require('discord.js');
const authenticate = require('../utils/authRegister')
const authCheck = require('../utils/authCheck')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('authenticate')
        .setDescription('Authenticate the bot!')
        .addStringOption(option =>
            option.setName("bot_id")
                .setRequired(true)
                .setDescription("Bot ID.")
        ),
    async execute(interaction) {
        await interaction.deferReply();

        if (await authCheck(interaction.guildId)) {
            return await interaction.followUp({ content: "You have already authenticated.", ephemeral: true })
        }

        const botID = interaction.options.getString("bot_id");
        const auth = await authenticate(botID, interaction.guildId);
        if (auth) {
            await interaction.followUp({ content: "Authentication Successful!", ephemeral: true})
        }
        else {
            await interaction.followUp({ content: "Authentication Failed!", ephemeral: true})
        }
    }
};