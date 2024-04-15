const discordBots = require("../models/discordBot.model");
const status = require('../utils/status')

module.exports = async function adminCheck(guildID, interaction) {
    const doc = await discordBots.findOne({discordGuilds: guildID.toString()});
    const roleId = doc['guildData'][0][guildID]['adminRoleId']

    if (roleId === false) {
        return await status.adminRoleNotFound(interaction)
    }

    const role = await interaction.guild.roles.fetch(roleId)


    if (!await interaction.member.roles.cache.has(role.id)) {
        return await status.memberNotAdmin(interaction)
    }

};