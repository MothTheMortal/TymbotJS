const getResponse = require('../utils/getResponse.js');
const authenticate = require('../utils/authCheck.js');
module.exports = async function chatbotResponse(message, clientID) {
    let messageContent = message.content
    const match = /<@.*?>/g;

    if(match.test(messageContent)) {
        messageContent = messageContent.replace(/<@.*?>/g, '');
    }
    let messageObj;

    if (message.channel.constructor.name.toLowerCase().includes("thread")) {
        messageObj = await message.channel.send({ content: "*Responding... 🕐*"})
    }
    else {
        const threadTitle = message.content.replace(`<@${clientID}>`, '');
        const thread = await message.startThread({ name: threadTitle, autoArchiveDuration: 60});
        messageObj = await thread.send({ content: "*Responding... 🕐*" })
    }


    const response = await getResponse(messageContent, message.channel.guild.id);

    const handleResponse = async (message, oldMessage) => {
        await message.react('👍');
        await message.react('👎');
        const messageUser = oldMessage.author
        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === messageUser.id;
        };


        const options = {filter, max: 1, time: 30000, errors: ["time"] }

        message.awaitReactions(options)
            .then(async emojiList => {
                const reaction = emojiList.first();
                if (reaction.emoji.name === '👍') {
                    console.log("User happy!");
                }
                else if (reaction.emoji.name === '👎') {
                    const auth = await authenticate(oldMessage.guild.id)
                    const reviewChannelId = auth['guildData'][0][oldMessage.guild.id.toString()]['reviewChannelId']
                    let channel;

                    if (reviewChannelId) {
                        channel = await oldMessage.guild.channels.fetch(reviewChannelId)
                    }
                    else {
                        const owner = await oldMessage.guild.members.fetch(oldMessage.guild.ownerId)
                        channel = owner.dmChannel
                        if (!channel) {
                            channel = await owner.createDM()
                        }
                    }

                    await channel.send(`**<@${oldMessage.author.id}>(${oldMessage.author.username}) disliked a response**\n**Query:** ${messageContent}\n**Response:** ${response.data.response}`)

                }
                await message.reactions.removeAll()

            })
            .catch(async emojiList => {
                await message.reactions.removeAll()
            })
    }

    // let responseMsg = response.data.response;
    let responseMsg = response
    if (message.channel.constructor.name.toLowerCase().includes("thread")) {
        await messageObj.edit({ content: `<@${message.author.id}> ${responseMsg}`}).then(msg => handleResponse(msg, message))
    }
    else {
        await messageObj.edit({ content:`<@${message.author.id}> ${responseMsg}` }).then(msg => handleResponse(msg, message))
    }



}
