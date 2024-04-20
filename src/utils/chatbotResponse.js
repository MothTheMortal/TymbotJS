const getResponse = require('../utils/getResponse.js');
const authenticate = require('../utils/authCheck.js');
module.exports = async function chatbotResponse(message, clientID) {
    let messageContent = message.content
    const match = /<@.*?>/g;

    if(match.test(messageContent)) {
        messageContent = messageContent.replace(/<@.*?>/g, '');
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
                    const staffRoleId = auth['guildData'][0][oldMessage.guild.id.toString()]['adminRoleId']
                    if (staffRoleId) {
                        const staffRole = await oldMessage.guild.roles.fetch(staffRoleId);
                        const memberCollection = staffRole.members.toJSON()
                        for await (const member of memberCollection) {
                            try {
                                let dmChannel = member.dmChannel
                                if (!dmChannel) {
                                    dmChannel = await member.createDM()
                                }
                                await dmChannel.send(`**<@${oldMessage.author.id}>(${oldMessage.author.username}) disliked a response**\n**Query:** ${messageContent}\n**Response:** ${response.data.response}`)

                            } catch (error) {}
                        }
                    }

                }
                await message.reactions.removeAll()

            })
            .catch(async emojiList => {
                await message.reactions.removeAll()
            })
    }

    let responseMsg = response.data.response;

    if (message.channel.constructor.name.toLowerCase().includes("thread")) {
       await message.channel.send({ content: `<@${message.author.id}> ${responseMsg}`}).then(msg => handleResponse(msg, message))
    }
    else {
        const threadTitle = message.content.replace(`<@${clientID}>`, '');
        const thread = await message.startThread({ name: threadTitle, autoArchiveDuration: 60});
        await thread.send({ content:`<@${message.author.id}> ${responseMsg}` }).then(msg => handleResponse(msg, message))
    }



}
