const fs = require("node:fs");
const updateKnowledgeBase = require('../utils/updateKnowledgeBase');

module.exports = async function eventAnnouncement(event) {
    const data = fs.readFileSync('src/config.json', 'utf8');
    const jsonData = JSON.parse(data);
    const eventChannel = await event.client.channels.fetch(jsonData.eventChannel);
    await eventChannel.send({ content: `[New Event!](${event.url})`})
}