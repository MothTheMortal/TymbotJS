const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const status = require('../utils/status')
const authCheck = require("../utils/authCheck");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives information about the Bot.')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of Information')
                .setRequired(true)
                .addChoices(
                    { name: "Bot Information", value: "basic"},
                    { name: "Feed Channels", value: "feed" },
                    { name: "Event Channels", value: "event" }
                )
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const auth = await authCheck(interaction.guildId)

        if (!auth) {
            return await status.botNotAuthenticated(interaction)
        }

        const choice = interaction.options.getString('type')

        const embed = new EmbedBuilder()

        if (choice === "basic") {
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
            **Staff Role:** <@&${guildData['adminRoleId']}>
            **Auto-Role:** ${guildData['giveNotificationOnJoin'] ? "Enabled" : "Disabled"}
            **Notification Role:** ${guildData['eventNotification'] ? `<@&${guildData['eventNotification']}>` : 'None'}
            **Feed Channels (${guildData['feedChannels'].length}):** ${guildData['feedChannels'].length ? guildData['feedChannels'].map(id => `<#${id}>`).join(', ') : 'None'}
            **Event Channels (${guildData['eventChannels'].length}):** ${guildData['eventChannels'].length ? guildData['eventChannels'].map(id => `<#${id}>`).join(', ') : 'None'}
            `

            embed.setTitle("Bot Information").setDescription(description).setFooter({ text: "Created by: Apnatomy"})

        }
        else if (choice === "feed") {
            embed.setTitle("Feed Channels")
                .setDescription("Feed Channels are channels where every message will be fed into the Knowledge Base")
        }
        else {
            embed.setTitle("Event Channels")
                .setDescription("Event channels are channels where Discord Event annoucements will be sent")
        }

        await interaction.followUp({ embeds: [embed] })

    }
}

