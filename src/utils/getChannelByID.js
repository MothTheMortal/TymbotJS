module.exports = async function getChannelByID(channelID, interaction) {
    const channel = await interaction.client.channels.fetch(channelID);
    return channel.name;
}