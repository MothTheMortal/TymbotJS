const discordBots = require("../models/discordBot.model");

module.exports = async function reminderAdd(eventId, reminderData, guildID) {
    const discordBot = await discordBots.findOne({discordGuilds: guildID.toString()});
    const data = discordBot.guildData

    let eventFound;

    for (let event of data[0][guildID]["events"]) {
        if (event.id === eventId.toString()) {
            event.reminders.push(reminderData);
            eventFound = true
            break
        }
    }

    if (!eventFound) {
        return false
    }

    await discordBots.updateOne({discordGuilds: guildID.toString()}, {$set: {guildData: data}})
    return true
}