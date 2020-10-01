const { DiscordAPIError } = require("discord.js");
const RANDOM = require("../ExternalFuncs/random")
const Discord = require("discord.js")
const {PREFIX} = require('../config.json')

module.exports = {
	name: 'avatar',
    description: 'Obtain a message embed containing avatar',
    args: true,
    usage: '<user>',
    guildOnly: true,
    aliases:['icon','pfp'],
	execute(message, args) {
    	RANDOM.getQuotePromise().then(data => {
            const QUOTE = JSON.parse(data.slice(2, data.length-1)).quoteText
            
            // Get random color hex
            const COLORHEX = RANDOM.getColor()
            const EMBED = new Discord.MessageEmbed()

            if(args[0] == "bot"){
                EMBED
                .setTitle(message.client.user.username)
                .addField("Creator", 'Bk49#8504', true)
                .addField("Created at", '24/09/2020', true)
                .addField("Quote for you", QUOTE)
                .setColor(COLORHEX)
                .setThumbnail(message.client.user.avatarURL())
                .setFooter('Quote by Forismatic')
            }
            else{
                const user = message.mentions.users.first()
                if(!user) return message.channel.send(`\nThe proper usage would be: \n\`${PREFIX}${this.name} ${this.usage}\``)
                EMBED
                .setTitle(user.username)
                .addField("Discord Tag", user.tag, true)
                .addField("Status", user.presence.status, true)
                .addField("Account Creation", user.createdAt)
                .addField("Bot", user.bot, true)
                .addField("Quote for you", QUOTE)
                .setColor(COLORHEX)
                .setThumbnail(message.client.user.avatarURL())
                .setImage(user.avatarURL())
                .setFooter('Quote by Forismatic')
            }

            message.channel.send(EMBED)
        }).catch(err => console.log(err))
	},
};