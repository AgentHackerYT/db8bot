const Discord = require('discord.js')
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('commands')
        .setDescription('Show Bot\'s Available Commands!'),
    async execute(interaction) {
        require('../modules/telemetry').telemetry(__filename, interaction)
        const embedNew = new Discord.EmbedBuilder()
            .setColor('36393E') // change the color!
            .setTitle('db8bot Commands\n\n')
            .setDescription('**Prefix:** `/`')
            .setFooter({ text: `${process.env.NAME} Commands` })
            .setTimestamp()
            .setTitle('Access commands by typing `/` and then the command name.')
            .addFields(
                { name: ':tools: **General**', value: 'commands, help, feedback, invite, ping, say, serverinv, clean, purge', inline: true },
                { name: ':information_source: **Information**', value: 'botinfo, serverinfo', inline: true }, { name: ':trophy: **Debate**', value: 'get, **startround: setspeech, endround, roundstatus, flip**, judgeinfo, speeches', inline: true },
                { name: ':partying_face: **Fun**', value: 'communism, capitalism, jpow, yellen, trump, biden, amash, baudrillard, bataille, agamben, foucault', inline: true }
            )
        interaction.reply({ embeds: [embedNew] })
    }
}
