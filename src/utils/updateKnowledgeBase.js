const fs = require('node:fs')
const authenticate = require('./authCheck')

module.exports = async function updateKnowledgeBase(text, guildID) {
    const auth = await authenticate(guildID);
    if (!auth) {
        console.log("Failed to update Knowledge Base, Discord Bot not authenticated.")
    }

    console.log("Updating Knowledge Base");
    fs.appendFileSync("src/data.txt", text + "  \n");
};