const discordBots = require("../models/discordBot.model");

module.exports = async function removeFeedChannel(channelID, guildID) {
    const discordBot = await discordBots.findOne({discordGuilds: guildID.toString()});

    const data = discordBot.guildData
    data[0][guildID]["feedChannels"].pop(channelID.toString())
    await discordBots.updateOne({discordGuilds: guildID.toString()}, {$set: {guildData: data}})
}