const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildScheduledEventUpdate,
    async execute(oldEvent, newEvent) {
        console.log(oldEvent.id, "is now", newEvent.id)
    }
}