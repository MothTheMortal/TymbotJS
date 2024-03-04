const discordBots = require("../models/discordBot.model");

module.exports = async function addFeedChannel(channelID, guildID) {
    await discordBots.updateOne({discordGuilds: guildID.toString()}, {$push: {feedChannels: channelID.toString()}})
}