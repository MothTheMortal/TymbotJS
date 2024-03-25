const { Events } = require('discord.js');
const discordBots = require("../models/discordBot.model");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {

        const discordBot = await discordBots.findOne({discordGuilds: member.guild.id.toString()})

        if (discordBot.guildData[0][member.guild.id]["giveNotificationOnJoin"]) {
            const roleId = discordBot.guildData[0][member.guild.id]["eventNotification"]
            const role = await member.guild.roles.fetch(roleId)
            await member.roles.add(role)
        }

    }
}