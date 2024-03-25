const getResponse = require('../utils/getResponse.js');

module.exports = async function chatbotResponse(message, clientID) {
    const response = await getResponse(message.content, message.channel.guild.id);

    let responseMsg = response.data.response;
    if (message.channel.constructor.name.toLowerCase().includes("thread")) {
        await message.channel.send({ content: `<@${message.author.id}> ${responseMsg}`})
    }
    else {
        const threadTitle = message.content.replace(`<@${clientID}>`, '');
        const thread = await message.startThread({ name: threadTitle, autoArchiveDuration: 60});
        await thread.send({ content:`<@${message.author.id}> ${responseMsg}` });
    }
}
