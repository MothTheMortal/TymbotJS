const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        await console.log("Message Deleted")
        // Run a command that unmarks this message
    }
}