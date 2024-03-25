const { SlashCommandBuilder } = require('discord.js');
const authenticate = require('../utils/authRegister')
const authCheck = require('../utils/authCheck')


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
            return await interaction.followUp({ content: "This discord server already has an active integration.", ephemeral: true })
        }

        const botID = interaction.options.getString("bot_id");
        const auth = await authenticate(botID, interaction.guildId);
        if (auth) {
            await interaction.followUp({ content: "Integration Successful!", ephemeral: true})
        }
        else {
            await interaction.followUp({ content: "Integration Failed!", ephemeral: true})
        }
    }
};