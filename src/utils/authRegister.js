const discordBots = require("../models/discordBot.model");

module.exports = async function authRegister(botId, guildID) {
    const discordBot = await discordBots.findOne({ botId });

    if (!discordBot) {
        return false
    }

    const botData = discordBot.toJson();

    if (botData.discordGuilds.length >= botData.maxGuilds) {
        return false
    }

    const data = botData.guildData
    data[0][guildID] = {
        feedChannels: [],
        eventChannels: []
    }
    await discordBots.updateOne({ botId }, {$set: {guildData: data}})
    await discordBots.updateOne({ botId }, {$push: {discordGuilds: guildID.toString()}})


    return true
};