const { Events } = require('discord.js');
const fs = require('node:fs');
const chatbotResponse = require('../utils/chatbotResponse');
const updateKnowledgeBase = require('../utils/updateKnowledgeBase');
const authenticate = require('../utils/authCheck')
module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const clientID = message.client.user.id;

        const auth = await authenticate(message.guildId)
        if (message.author.id === clientID) return;

        if ((message.content.includes(`<@${clientID}>`) && !message.channel.constructor.name.toLowerCase().includes("thread")) || (message.channel.constructor.name.toLowerCase().includes("thread") && message.channel.ownerId === clientID)) {
            if (!auth) {
                return message.reply({ content: "Bot has not been authenticated." })
            }
            else {
                return await chatbotResponse(message, clientID);
            }
        }

        if (!auth) {
            return
        }

        const botData = auth.toJson()
        console.log(botData)

        if (botData.feedChannels.includes(message.channel.id.toString())) {
            await updateKnowledgeBase(message.content, message.guildId)
        }
    }

}