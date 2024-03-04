mongoose = require('mongoose');

const discordBotSchema = new mongoose.Schema({
    botId: {
        type: String,
        required: true
    },
    maxGuilds: {
        type: Number,
        default: 1
    },
    discordGuilds: {
        type: Array,
        validate: function (arr)  {
            return arr.length <= this.maxGuilds;
        }
    },
    feedChannels: {
        type: Array
    },
    eventChannel: {
        type: String
    },
    chatbot: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Chatbot",
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    lastUpdatedAt: {
        type: Date,
        default: () => Date.now(),
    },
});


discordBotSchema.pre(["updateOne", "findOneAndUpdate"], function () {
    this.set({ lastUpdatedAt: Date.now() });
});

discordBotSchema.methods.toJson = function () {
    let obj = this.toObject();
    delete obj.createdAt;
    delete obj.lastUpdatedAt;
    delete obj.__v;
    return obj;
};

const discordBotModel = mongoose.model("DiscordBot", discordBotSchema, "discordBots");

module.exports = discordBotModel;