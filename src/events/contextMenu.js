const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isMessageContextMenuCommand()) return;
        const message = interaction.targetMessage

        if (interaction.commandName.includes('Unmark')) {
            await interaction.reply({content:"Message Unmarked", ephemeral:true})
            console.log("Unmark User!")
            console.log(message.content)
            console.log(message.author.username)
        }

        else {
            await interaction.reply({content:"Message Marked", ephemeral:true})
            console.log("Mark user")
            console.log(message.content)
            console.log(message.author.username)
        }

    }

}