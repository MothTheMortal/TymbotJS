const { SlashCommandBuilder } = require('discord.js');
const authCheck = require('../utils/authCheck')
const status = require("../utils/status")
const discordBots = require("../models/discordBot.model");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin-role')
        .setDescription('Select a role to be given Administrator permission!')
        .addRoleOption(option =>
            option.setName("role")
                .setRequired(true)
                .setDescription("Administrator Role.")
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const auth = await authCheck(interaction.guildId)
        const role = interaction.options.getRole('role')

        if (!auth) {
            return await status.botNotAuthenticated(interaction)
        }

        if (interaction.guild.ownerId !== interaction.user.id) {
            return await status.memberNotOwner(interaction)
        }

        const data = auth.guildData

        if (data[0][interaction.guildId]["adminRoleId"] === role.id.toString()) {
            return await status.duplicateRole(interaction)
        }

        data[0][interaction.guildId]["adminRoleId"] = role.id.toString()
        await discordBots.updateOne({discordGuilds: interaction.guildId.toString()}, {$set: {guildData: data}})
        await status.adminRoleSuccess(interaction)






    }
};