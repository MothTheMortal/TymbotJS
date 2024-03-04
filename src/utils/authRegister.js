const discordBots = require("../models/discordBot.model");

module.exports = async function authRegister(botID, guildID) {
    const discordBot = discordBots.findOne({botId: botID});
    if (!discordBot) {
        return false
    }
    await discordBot.updateOne({}, {$push: {discordGuilds: guildID.toString()}})
    return true
};