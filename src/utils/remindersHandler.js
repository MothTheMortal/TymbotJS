const discordBots = require("../models/discordBot.model");
const cron = require('node-cron');
const console = require("node:console");
const eventAnnouncement = require('../utils/eventAnnoucement')

function findEventPosition(events, event) {
    return events.findIndex(e => e.id === event.id);
}


const reminderTask = (client) => cron.schedule('*/10 * * * * *', async () => {
    try {
        const bots = await discordBots.find({});
        const unixTime = Math.floor(Date.now() / 1000);

        let guildID;

        for (let bot of bots) {
            const guildData = JSON.parse(JSON.stringify(bot.guildData));
            for (let serverKey of Object.keys(bot.guildData[0])) {
                for (let event of bot.guildData[0][serverKey].events) {
                    let guild = await client.guilds.fetch(event.guildId.toString());
                    guildID = guild.id;
                    for (let reminder of event.reminders) {
                        if (reminder.unix <= unixTime) {
                            const discordEvent = await guild.scheduledEvents.fetch(event.id);

                            if (!discordEvent) { // Remove non existent events
                                console.log("Event not found! Deleting.")
                                guildData[0][serverKey].events = guildData[0][serverKey].events.filter(e => e.id !== event.id)
                                break
                            }

                            await eventAnnouncement(discordEvent, reminder.text);
                            guildData[0][serverKey].events[findEventPosition(guildData[0][serverKey].events, event)].reminders = guildData[0][serverKey].events[findEventPosition(guildData[0][serverKey].events, event)].reminders.filter(e => e.unix !== reminder.unix)

                        }
                    }
                }
            }
            if (guildID) {
                await discordBots.updateOne({discordGuilds: guildID.toString()}, {$set: {guildData: guildData}})
            }
        }
    } catch (error) {
        console.error("An error occurred in the cron schedule:", error);
    }
}, {
    scheduled: false
});
module.exports = { reminderTask }