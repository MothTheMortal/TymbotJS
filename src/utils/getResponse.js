module.exports = async function getResponse(query, guildID) {
    return "You're good"
    const url = 'https://dev-server.tymbot.io/api/v1/cors/chatbot/query?liveId=7b845a17f6094009961b5b67d9e3e283';
    const data = {
        message: query,
        prevMessages: []
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

        return await response.json();
};