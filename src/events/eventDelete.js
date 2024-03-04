const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildScheduledEventDelete,
    async execute(event) {
        await console.log("Event Deleting", event.name)
    }
}