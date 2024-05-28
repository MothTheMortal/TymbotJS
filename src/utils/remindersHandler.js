const discordBots = require("../models/discordBot.model");
const cron = require('node-cron');
const console = require("node:console");
const eventAnnouncement = require('../utils/eventAnnoucement')

function removeReminder(events, event, reminder) {
    let eventIndex = events.findIndex(e => e.id === event.id);
    if (eventIndex !== -1) {
        events[eventIndex].reminders =
            events[eventIndex].reminders.filter(e => e.unix !== reminder.unix);
    }
    return events;
}

const reminderTask = (client) => cron.schedule('*/10 * * * * *', async () => {
    try {
        const bots = await discordBots.find({});
        const unixTime = Math.floor(Date.now() / 1000);
        let guild;

        for (let bot of bots) {
            let changesMade = false;
            const guildData = JSON.parse(JSON.stringify(bot.guildData));
            for (let serverKey of Object.keys(guildData[0])) {
                let serverEvents = guildData[0][serverKey].events;
                for (let i = 0; i < serverEvents.length; i++) {
                    let event = serverEvents[i];
                    guild = await client.guilds.fetch(event.guildId.toString());

                    let discordEvent;
                    try {
                        discordEvent = await guild.scheduledEvents.fetch(event.id);
                    } catch (err) {
                        discordEvent = false;
                    }

                    if (!discordEvent) { // Remove non existent events
                        console.log('Event not found! Deleting.');
                        serverEvents.splice(i, 1);
                        i--;
                        changesMade = true;
                        continue;
                    }

                    for (let reminder of event.reminders) {
                        if (reminder.unix <= unixTime) {
                            await eventAnnouncement(discordEvent, reminder.text);
                            serverEvents = removeReminder(serverEvents, event, reminder);
                            changesMade = true;
                        }
                    }
                }
            }
            if (changesMade) {
                await discordBots.updateOne({ discordGuilds: guild.id.toString() }, { $set: { guildData } });
            }
        }
    } catch (error) {
        console.error('An error occurred in the cron schedule:', error);
    }
}, {
    scheduled: false
});
module.exports = { reminderTask }