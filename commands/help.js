const Discord = require("discord.js")
const {PREFIX} = require('../config.json')
const RANDOM = require('../ExternalFuncs/random')

module.exports = {
    name:'help',
    description: 'Get help to understand a command or list all commands',
    args: false,
    usage: '<null | command-name>',
    guildOnly: false,
    aliases:['h'],
    execute(message, args){
        if(args[0]){
            try{
                let command = require(`../commands/${args[0]}`)
                const EMBED = new Discord.MessageEmbed()
                    EMBED
                    .setTitle('Help command')
                    .addField('Command name', '\`'+command.name+'\`' , true)
                    .addField('Aliases',command.aliases.toString(), true)
                    .addField('Usage', `\`${PREFIX}${command.name} ${command.usage}\``)
                    .addField('Server only command', command.guildOnly, true)
                    .addField('Must have arguments', command.args, true )
                    .setColor(RANDOM.getColor())
                    .setThumbnail(message.client.user.avatarURL())

                return message.channel.send(EMBED)
            }catch(e){
                console.log(e)
                return message.channel.send('Command not found! Please input the correct command name!')
            }
        }else{
            let { commands } = message.client
            commands = Array.from(commands, ([key, value])=>({key,value}))
            // console.log(commands)
            const embed = new Discord.MessageEmbed()
            const embeds = []

            embed.setThumbnail(message.client.user.avatarURL())
            let u = -1;
            for(let i = 0; i < commands.length; i++){
                if(i % 25 == 0) {
                    ++u
                    embeds.push(embed)
                }
                embeds[u].addField(`\`${PREFIX}${commands[i].value.name} ${commands[i].value.usage || ''}\``, commands[i].value.description)
            }
            
            for(let i = 0;i < embeds.length;i++){
                embed.setTitle(`Page ${i+1} of commands`)
                embed.setDescription(`You can send \`${PREFIX}help <command-name> to get the proper usage of a specific command!`)
                embeds[i].setColor(RANDOM.getColor())
                message.author.send(embeds[i])
            }
            return
        }
    }
}