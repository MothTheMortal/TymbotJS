const discordBots = require("../models/discordBot.model");

module.exports = async function (guildID, eventBool, joinBool, roleID = null) {
    const discordBot = await discordBots.findOne({discordGuilds: guildID.toString()});
    const data = discordBot.guildData

    if (eventBool) {
        data[0][guildID]["eventNotification"] = roleID
        data[0][guildID]["giveNotificationOnJoin"] = joinBool
    }
    else {
        data[0][guildID]["eventNotification"] = false
        data[0][guildID]["giveNotificationOnJoin"] = false
    }

    await discordBots.updateOne({discordGuilds: guildID.toString()}, {$set: {guildData: data}})

}