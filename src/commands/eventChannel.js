const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');
const authenticate = require('../utils/authCheck');
const addEventChannel = require('../utils/eventChannelAdd');
const removeEventChannel = require('../utils/eventChannelRemove');
const getChannelByID = require('../utils/getChannelByID');
const eventUpdate = require('../utils/updateAnnoucementRole')
const status = require("../utils/status")
const adminCheck = require("../utils/adminCheck");


const commandData = new SlashCommandBuilder()
    .setName("event")
    .setDescription("Event-related commands.")
    .addSubcommand( subcommand =>
        subcommand.setName("notification")
            .setDescription("Pings a role on Event Annoucement!")
            .addBooleanOption( option =>
                option.setName("notify")
                    .setRequired(true)
                    .setDescription("Whether to ping a role on event annoucement or not. (T/F)")
            )
            .addRoleOption(option =>
                option.setName("role")
                    .setRequired(false)
                    .setDescription("The role to ping on Event Annoucement.")
            )
            .addBooleanOption( option =>
                option.setName("on-join")
                    .setRequired(false)
                    .setDescription("Whether to automatically assign this role when a user joins the server or not (T/F).")
            )
    )
    .addSubcommand(subcommand =>
        subcommand.setName("add-channel")
            .setDescription("Adds an event channel.")
            .addChannelOption(option =>
                option.setName("channel")
                    .setDescription("The selected channel.")
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommand =>
        subcommand.setName("remove-channel")
            .setDescription("Removes an event channel.")
            .addChannelOption(option =>
                option.setName("channel")
                    .setDescription("The selected channel.")
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
            )
    ).addSubcommand(subcommand =>
        subcommand.setName("view-channels")
            .setDescription("Shows a list of the event channels.")
    )

module.exports = {
    data: commandData,
    async execute(interaction) {
        await interaction.deferReply();
        const auth = await authenticate(interaction.guildId);

        if (!auth) {
            return await status.botNotAuthenticated(interaction)
        }

        const check = await adminCheck(interaction.guildId, interaction)

        if (check !== undefined) {
            return
        }

        const botData = auth.toJson();

        if (interaction.options.getSubcommand() === 'add-channel') {
            const channel = interaction.options.getChannel('channel')

            if (botData.guildData[0][interaction.guildId].eventChannels.includes(channel.id.toString())) {
                return await status.alreadyEventChannel(interaction)
            }

            if (botData.guildData[0][interaction.guildId].feedChannels.includes(channel.id.toString())) {
                return await status.alreadyFeedChannel(interaction)
            }


            await addEventChannel(channel.id, channel.guildId);
            await status.eventChannelAddSuccessful(interaction)
        }
        else if (interaction.options.getSubcommand() === 'remove-channel') {
            const channel = interaction.options.getChannel('channel')

            if (!botData.guildData[0][interaction.guildId].eventChannels.includes(channel.id.toString())) {
                return await status.notAnEventChannel(interaction)
            }

            await removeEventChannel(channel.id, channel.guildId)
            await status.eventChannelRemoveSuccessful(interaction)
        }
        else if (interaction.options.getSubcommand() === 'view-channels') {

            let description = ""

            if (botData.guildData[0][interaction.guildId].eventChannels.length > 0) {

                for (let channelID of botData.guildData[0][interaction.guildId].eventChannels) {
                    description += `- #${await getChannelByID(channelID, interaction)}\n`
                }

            } else {
                description = "None"
            }

            const msgEmbed = new EmbedBuilder()
                .setTitle(`Event Channels (${botData.guildData[0][interaction.guildId].eventChannels.length})`)
                .setDescription(description)

            await interaction.followUp({ embeds: [msgEmbed] })


        }
        else if (interaction.options.getSubcommand() === 'notification') {
            const notifyBool = interaction.options.getBoolean('notify');
            const joinBool = interaction.options.getBoolean('on-join')
            if (notifyBool) {
                const notificationRole = interaction.options.getRole('role')

                if (!notificationRole) {
                    return await status.roleNotGiven(interaction)
                }

                const botMember = await interaction.guild.members.fetch(interaction.client.user.id)
                const highestBotRole = botMember.roles.highest

                if (highestBotRole.position <= notificationRole.position) {
                    return await status.insufficientRoleAssignmentPermission(interaction)
                }

                await eventUpdate(interaction.guildId, notifyBool, joinBool, notificationRole.id)
                await interaction.followUp(`Global Notification has been set to True, and will ping '${notificationRole.name}'.`)
            }
            else {

                await eventUpdate(interaction.guildId, notifyBool, joinBool)
                await interaction.followUp("Global notification has been set to False.")

            }

        }
    }
}