const { Events } = require('discord.js');
const eventAnnouncement = require('../utils/eventAnnoucement')

module.exports = {
    name: Events.GuildScheduledEventCreate,
    async execute(event) {
        await eventAnnouncement(event)
    }
}