const { EmbedBuilder } = require('discord.js');
const defaultColor = "#FFFFFF";
const successColor = "#00FF00";
const errorColor = "#FF0000";



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

async function duplicateRole(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("This role is already set as an Administrator.")
        .setColor(defaultColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
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
        .setTitle("Event channel added successfully.")
        .setColor(successColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function feedChannelAddSuccessful(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Feed channel added successfully.")
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
        .setTitle("Insufficient permission to assign roles.")
        .setColor(errorColor);
    return await interaction.followUp({ embeds: [statusEmbed] });
}

async function botNotAuthenticated(interaction) {
    const statusEmbed = new EmbedBuilder()
        .setTitle("Bot is not authenticated.")
        .setColor(errorColor);
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
    memberNotOwner
}