const discordBots = require("../models/discordBot.model");

module.exports = async function removeFeedChannel(channelID, guildID) {
    await discordBots.updateOne({discordGuilds: guildID.toString()}, {$pull: {feedChannels: channelID.toString()}})
}