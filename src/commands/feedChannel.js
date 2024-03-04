const { SlashCommandBuilder, ChannelType } = require('discord.js');
const authenticate = require('../utils/authCheck');
const addFeedChannel = require('../utils/feedChannelAdd');
const removeFeedChannel = require('../utils/feedChannelRemove');

const commandData = new SlashCommandBuilder()
    .setName("feed-channel")
    .setDescription("good")
    .addSubcommand(subcommand =>
        subcommand.setName("add")
        .setDescription("Adds a feed channel.")
        .addChannelOption(option =>
            option.setName("channel")
            .setDescription("The selected channel.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName("remove")
            .setDescription("Removes a feed channel")
            .addChannelOption(option =>
                option.setName("channel")
                    .setDescription("The selected channel.")
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
            )
    )


module.exports = {
    data: commandData,
    async execute(interaction) {
        await interaction.deferReply();
        const auth = await authenticate(interaction.guildId);
        if (!auth) {
            return await interaction.followUp({ content: "Please authenticate the bot before running any commands." })
        }

        const botData = auth.toJson();

        if (interaction.options.getSubcommand() === 'add') {
            const channel = interaction.options.getChannel('channel')

            if (botData.feedChannels.includes(channel.id.toString())) {
                return await interaction.followUp(`<#${channel.id}> is already a feed channel!`)
            }

            await addFeedChannel(channel.id, channel.guildId);
            await interaction.followUp(`<#${channel.id}> has been added to the feed.`)
        }

        else if (interaction.options.getSubcommand() === 'remove') {
            const channel = interaction.options.getChannel('channel')

            if (!botData.feedChannels.includes(channel.id.toString())) {
                return await interaction.followUp(`<#${channel.id}> is not a feed channel!`)
            }

            await removeFeedChannel(channel.id, channel.guildId)
            await interaction.followUp(`<#${channel.id}> has been removed from the feed.`)
        }
    }
}


