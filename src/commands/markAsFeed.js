const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Mark Message as Feed Message')
        .setType(ApplicationCommandType.Message),
    context: true
}