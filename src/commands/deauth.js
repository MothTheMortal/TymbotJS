const { SlashCommandBuilder } = require('discord.js');
const discordBots = require("../models/discordBot.model");
const authenticate = require('../utils/authCheck');
const status = require("../utils/status")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-integration')
        .setDescription('Remove the the active bot integration!'),

    async execute(interaction) {
        await interaction.deferReply();

        if (interaction.guild.ownerId !== interaction.user.id) {
            return await status.memberNotOwner(interaction)
        }

        const data = await authenticate(interaction.guildId);

        if (data) {
            data['discordGuilds'].pop(interaction.guildId.toString())
            delete data['guildData'][0][interaction.guildId.toString()]
            await discordBots.updateOne({discordGuilds: interaction.guildId.toString()}, {$set: {guildData: data['guildData']}})
            await discordBots.updateOne({discordGuilds: interaction.guildId.toString()}, {$set: {discordGuilds: data['discordGuilds']}})


            return await status.integrationRemoved(interaction)
        }
        else {
            return await status.noActiveIntegration(interaction)
        }
    }
};