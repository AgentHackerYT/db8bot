exports.run = function (client, message, args) {
    const superagent = require('superagent');
    const Discord = require('discord.js');
    const config = client.config;
    const { det } = require("detergent");
    const stripHtml = require("string-strip-html");
    if (client.optINOUT.get(message.author.id) != undefined) {
        if (client.optINOUT.get(message.author.id).value.includes(__filename.substring(__filename.lastIndexOf("/") + 1, __filename.indexOf(".js")))) return message.channel.send("You have opted out of this service. Use the `optout` command to remove this optout.")
    } function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }


    client.logger.log('info', `judgeinfo command used by ${message.author.username} Time: ${Date()} Guild: ${message.guild}`)
    const help = new Discord.MessageEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}judgeinfo`)
        .addField("**Usage:**", `${config.prefix}judgeinfo <tabroom judge's firstname> <judge lastname>`)
        .addField("**Example:**", `${config.prefix}judgeinfo Bob Ross`)
        .addField("**Expected Result From Example:**", "Bot will return the judge's paradigm along with the direct link to the paradigm.")
        .addField("**NOTES:**", "This command is in beta. It might not work as expected. The bot will return the paradigm in discord code blocks (cause it's better looking), however if something goes wrong, it will send the paradigm in plain text!")
    if (args.join(' ') === "" || args.join(' ').indexOf(" ") === -1) {
        message.channel.send({ embed: help })
        return;
    }


    superagent
        .get('https://tabroomapi.herokuapp.com/paradigm')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(JSON.parse(`{"apiauth": "${config.tabAPIKey}", "type":"name", "first":"${args[0]}", "last":"${args[1]}", "short":"${true}"}`))
        .end((err, res) => {
            var paradigm = res.body[0]
            if (paradigm.length > 1990) {
                while (paradigm.length > 1990) {
                    message.channel.send("```" + paradigm.substring(0, 1990).trim() + "```")
                    paradigm = paradigm.replace(paradigm.substring(0, 1990).trim(), "")
                }
                message.channel.send("```" + paradigm + "```")
            } else {
                message.channel.send("```" + paradigm + "```")
            }
            message.channel.send(`Direct Link: https://www.tabroom.com/index/paradigm.mhtml?search_first=${args[0]}&search_last=${args[1]}`)
        })
}