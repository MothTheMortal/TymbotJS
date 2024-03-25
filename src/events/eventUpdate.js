const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildScheduledEventUpdate,
    async execute(oldEvent, newEvent) {
        console.log(oldEvent.name, "is now", newEvent.name)
    }

}