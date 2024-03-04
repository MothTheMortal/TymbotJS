const discordBots = require("../models/discordBot.model");

module.exports = async function authCheck(guildID) {
    return discordBots.findOne({discordGuilds: guildID.toString()});
};