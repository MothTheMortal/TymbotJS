const discordBots = require("../models/discordBot.model");
const cron = require('node-cron');
const eventAnnouncement = require('../utils/eventAnnoucement')

function removeReminder(events, event, reminder) {
    let eventIndex = events.findIndex(e => e.id === event.id);
    if (eventIndex !== -1) {
        events[eventIndex].reminders =
            events[eventIndex].reminders.filter(e => e.unix !== reminder.unix);
    }
    return events;
}

const reminderTask = (client) => cron.schedule('*/3 * * * * *', async () => {
    try {
        const bots = await discordBots.find({});
        const unixTime = Math.floor(Date.now() / 1000);
        let guild;

        for (let bot of bots) {
            let changesMade = false;
            let guildData = JSON.parse(JSON.stringify(bot.guildData));
            let discordGuilds = JSON.parse(JSON.stringify(bot.discordGuilds));

            for (let serverKey of Object.keys(guildData[0])) {

                let serverData = guildData[0][serverKey];

                const adminRoleId = serverData['adminRoleId'];
                const reviewChannelId = serverData['reviewChannelId'];
                const eventChannelId = serverData['eventChannelId'];
                const feedChannelsId = serverData['feedChannels']

                try {
                    guild = await client.guilds.fetch(serverKey.toString());
                }
                catch (err) {
                    delete guildData[0][serverKey];
                    discordGuilds.pop(serverKey.toString())

                }

                if (adminRoleId) {
                    let role;
                    try {
                        role = await guild.roles.fetch(adminRoleId);
                    } catch (err) {}

                    if (!role) {
                        serverData["adminRoleId"] = false;
                        changesMade = true;
                    }
                }

                if (reviewChannelId) {
                    let channel;
                    try {
                        channel = await guild.channels.fetch(reviewChannelId);
                    } catch (err) {}

                    if (!channel) {
                        serverData["reviewChannelId"] = false;
                        changesMade = true;

                    }
                }

                if (eventChannelId) {
                    let channel;
                    try {
                        channel = await guild.channels.fetch(eventChannelId);
                    } catch (err) {}

                    if (!channel) {
                        changesMade = true;
                        serverData["eventChannelId"] = false;
                    }
                }

                if (feedChannelsId) {
                    const channels = await Promise.all(
                        feedChannelsId.map(channelId => guild.channels.fetch(channelId).catch(err => null))
                    );
                    changesMade = true;
                    serverData["feedChannels"] = channels.filter(channel => channel).map(channel => channel?.id);
                }

                let serverEvents = serverData.events;

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
                await discordBots.updateOne({ discordGuilds: guild.id.toString() }, { $set: { discordGuilds } });
            }
        }
    } catch (error) {
        console.error('An error occurred in the cron schedule:', error);
    }
}, {
    scheduled: false
});
module.exports = { reminderTask }