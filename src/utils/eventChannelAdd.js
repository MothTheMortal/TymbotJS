const discordBots = require("../models/discordBot.model");

module.exports = async function addEventChannel(channelID, guildID) {
    const discordBot = await discordBots.findOne({discordGuilds: guildID.toString()});
    const data = discordBot.guildData
    data[0][guildID]["eventChannelId"] = channelID.toString()
    await discordBots.updateOne({discordGuilds: guildID.toString()}, {$set: {guildData: data}})

}