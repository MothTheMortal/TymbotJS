const crypto = require('crypto')
const mongoose = require('mongoose');
const discordBotModel = require('../src/models/discordBot.model')
require('dotenv').config();
function generate256BitRandomNumber() {
    const randomBytes = crypto.randomBytes(32); // 32 bytes = 256 bits
    return randomBytes.toString('hex');
}
async function addBot(BotId) {
    await discordBotModel.create({
        botId: BotId
    });
    console.log(`Created discord bot!\nAdd with '${BotId}'`)
}

// async function run() {
//     const user = await discordBotModel.findOne({ discordGuilds: "1209826762490646619" })
//     // const user = await discordBotModel.findOne({ BotId: "0754d4e3451eed26ffa982000084fb2bd12775c2e34278dcf6a76737d2fa03cc"})
//     //     .updateOne({}, {$push: {discordGuilds: "1209826762490646619"}})
//     console.log(user)
// }

// addBot(generate256BitRandomNumber())
mongoose.connect(process.env.MONGODB)

addBot(generate256BitRandomNumber())