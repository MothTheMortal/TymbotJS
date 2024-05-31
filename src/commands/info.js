const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const status = require('../utils/status')
const authCheck = require("../utils/authCheck");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives information about the Bot.'),
    async execute(interaction) {
        await interaction.deferReply();
        const auth = await authCheck(interaction.guildId)

        if (!auth) {
            return await status.botNotAuthenticated(interaction)
        }

        const embed = new EmbedBuilder()

        const chatbotName = "chatbot"

        let discordGuildNames = [];
        const guildData = auth['guildData'][0][interaction.guild.id.toString()]

        for await (const guildID of auth['discordGuilds']) {
            const guild = await interaction.client.guilds.fetch(guildID)
            discordGuildNames.push(guild.name)
        }

        let description = `
        **Chatbot:** ${chatbotName}
        **Discord Server (${auth['discordGuilds'].length}/${auth['maxGuilds']}):** ${discordGuildNames.join(', ')}
        **Staff Role:** ${guildData['adminRoleId'] ? `<@&${guildData['adminRoleId']}>` : 'None'}
        **Auto-Role:** ${guildData['giveNotificationOnJoin'] ? "Enabled" : "Disabled"}
        **Notification Role:** ${guildData['eventNotification'] ? `<@&${guildData['eventNotification']}>` : 'None'}
        **Event Channel:** ${guildData['eventChannelId'] ? `<#${guildData['eventChannelId']}>` : 'None'}
        **Feed Channels (${guildData['feedChannels'].length}):** ${guildData['feedChannels'].length ? guildData['feedChannels'].map(id => `<#${id}>`).join(', ') : 'None'}
        `

        embed.setTitle("Bot Information").setDescription(description).setFooter({ text: "Created by: Apnatomy"})

        await interaction.followUp({ embeds: [embed] })

    }
}

