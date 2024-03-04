module.exports = function getResponse(query, guildID) {
    const responses = ["Yes", "No", "Maybe", "idk"];
    return responses[Math.floor(Math.random() * responses.length)]
};