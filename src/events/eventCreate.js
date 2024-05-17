const { Events } = require('discord.js');
const eventAnnouncement = require('../utils/eventAnnoucement')
const eventAdd = require('../utils/eventAdd')

module.exports = {
    name: Events.GuildScheduledEventCreate,
    async execute(event) {

        await eventAdd(event.id, event.guild.id)
        await eventAnnouncement(event)
    }
}