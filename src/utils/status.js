const { EmbedBuilder } = require('discord.js');
const defaultColor = "#FFFFFF";
const successColor = "#00FF00";
const errorColor = "#FF0000";




async function notificationSetting(interaction, notify, onjoin=null, roleId=null) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Notification Settings")
        .setDescription(`**Notify on Event Creation:** ${notify ? 'Enabled' : 'Disabled'}\n**Notification Role:** ${roleId ? `<@&${roleId}>` : 'None'}\n**Give Notification Role on Join:** ${onjoin ? 'Enabled' : 'Disabled'}`)
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function adminRoleNotFound(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Please assign an admin role with /admin-role before utilizing any commands.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function memberNotAdmin(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("You must be an Administrator before running this command.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function chatbotNotFound(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("The chatbot with the corresponding ID has not been found.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function guildLengthExceeded(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("This chatbot has reached its maximum integration limit for Discord Servers")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function adminRoleSuccess(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("The role has been successfully set as Administrator.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function reviewChannelSuccess(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("The channel has been successfully set as the review channel.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function duplicateRole(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("This role is already set as an Administrator.")
        .setColor(defaultColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function duplicateReviewChannel(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("This channel is already set as a review channel.")
        .setColor(defaultColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function channelNotPrivate(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Please select a private text channel.")
        .setColor(errorColor);
    return await interaction.followUp({embeds: [statusEmbed]});
}

async function channelNotViewable(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Bot does not have permission to view the selected channel.")
        .setColor(errorColor);
    return await interaction.followUp({embeds: [statusEmbed]});
}

async function channelCannotSendMessage(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Bot does not have permission to send messages in the selected channel.")
        .setColor(errorColor);
    return await interaction.followUp({embeds: [statusEmbed]});
}

async function integrationAlreadyActive(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Integration is already active.")
        .setColor(defaultColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function memberNotOwner(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Only the discord server owner can run this command.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function noActiveIntegration(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("No active integration found.")
        .setColor(defaultColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function integrationRemoved(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Integration has been removed.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function integrationSuccessful(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Integration was successful.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function integrationFailed(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Integration failed. Please try again later.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function alreadyEventChannel(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Channel is already designated as an event channel.")
        .setColor(defaultColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function alreadyFeedChannel(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Channel is already designated as a feed channel.")
        .setColor(defaultColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function eventChannelAddSuccessful(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Event channel set successfully.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function feedChannelAddSuccessful(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Feed channel added successfully.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function reminderAddedSuccessfully(interaction, time) {
    const statusEmbed = new EmbedBuilder()
        .setTitle(`The reminder has been added for ${time} the event.`)
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function eventChannelRemoveSuccessful(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Event channel removed successfully.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function feedChannelRemoveSuccessful(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Feed channel removed successfully.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function notAnEventChannel(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Channel is not designated as an event channel.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function notAFeedChannel(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Channel is not designated as a feed channel.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function roleNotGiven(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Role not given. Please provide a role.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function insufficientRoleAssignmentPermission(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Bot has insufficient permission to assign that roles.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function botNotAuthenticated(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Bot is not authenticated. (/integration)")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function invalidTime(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Please enter a valid number for time.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function timeBeforeCreation(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("The time you entered was before the creation of the event. Please try again with a valid time.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function eventNotFound(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("No event with the corresponding ID has been found.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function eventChannelNotFound(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("No event announcement channels has been set. Please use /event announcement-channel before utilizing this command.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}


async function defaultTextSet(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("The default text has been set successfully!")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

module.exports = {
    botNotAuthenticated,
    integrationAlreadyActive,
    noActiveIntegration,
    integrationRemoved,
    integrationSuccessful,
    integrationFailed,
    alreadyEventChannel,
    alreadyFeedChannel,
    eventChannelAddSuccessful,
    feedChannelAddSuccessful,
    eventChannelRemoveSuccessful,
    feedChannelRemoveSuccessful,
    notAnEventChannel,
    notAFeedChannel,
    roleNotGiven,
    insufficientRoleAssignmentPermission,
    duplicateRole,
    adminRoleSuccess,
    chatbotNotFound,
    guildLengthExceeded,
    memberNotOwner,
    adminRoleNotFound,
    memberNotAdmin,
    duplicateReviewChannel,
    reviewChannelSuccess,
    channelNotPrivate,
    defaultTextSet,
    invalidTime,
    eventNotFound,
    reminderAddedSuccessfully,
    timeBeforeCreation,
    eventChannelNotFound,
    notificationSetting,
    channelNotViewable,
    channelCannotSendMessage
}