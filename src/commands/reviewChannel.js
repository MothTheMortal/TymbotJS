const { SlashCommandBuilder, ChannelType} = require('discord.js');
const authCheck = require('../utils/authCheck')
const status = require("../utils/status")
const discordBots = require("../models/discordBot.model");
const adminCheck = require('../utils/adminCheck')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('review-channel')
        .setDescription('Select a channel where user reviews will be sent!')
        .addChannelOption(option =>
            option.setName("channel")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
                .setDescription("Review Channel.")
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const auth = await authCheck(interaction.guildId)
        const channel = interaction.options.getChannel('channel')

        if (!auth) {
            return await status.botNotAuthenticated(interaction)
        }

        const check = await adminCheck(interaction.guildId, interaction)

        if (check !== undefined) {
            return
        }

        const data = auth.guildData

        const everyoneRole = interaction.guild.roles.everyone

        if (channel.permissionsFor(everyoneRole).has('ViewChannel')) {
            return await status.channelNotPrivate(interaction)
        }

        if (data[0][interaction.guildId]["reviewChannelId"] === channel.id.toString()) {
            return await status.duplicateReviewChannel(interaction)
        }

        data[0][interaction.guildId]["reviewChannelId"] = channel.id.toString()
        await discordBots.updateOne({discordGuilds: interaction.guildId.toString()}, {$set: {guildData: data}})
        await status.reviewChannelSuccess(interaction)






    }
};