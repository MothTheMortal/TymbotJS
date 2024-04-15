const discordBots = require("../models/discordBot.model");
const status = require("../utils/status")
const {guildLengthExceeded} = require("./status");

module.exports = async function authRegister(botId, guildID) {
    const discordBot = await discordBots.findOne({ botId });

    if (!discordBot) {
        return status.chatbotNotFound
    }

    const botData = discordBot.toJson();

    if (botData.discordGuilds.length >= botData.maxGuilds) {
        return guildLengthExceeded
    }

    const data = botData.guildData
    data[0][guildID] = {
        adminRoleId: false,
        eventNotification: false,
        giveNotificationOnJoin: false,
        feedChannels: [],
        eventChannels: []
    }
    await discordBots.updateOne({ botId }, {$set: {guildData: data}})
    await discordBots.updateOne({ botId }, {$push: {discordGuilds: guildID.toString()}})


    return status.integrationSuccessful
};