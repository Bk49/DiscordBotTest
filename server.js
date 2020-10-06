'use-strict'
require('dotenv').config()

const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client();
const { PREFIX } = require('./config.json');

// Linking commands to a separate file
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Get the bot online
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Set the bot's status

// Server greeting 

// Detects messages and run commands under ./commands folder
client.on('message', msg => {
    if(!msg.content.slice(0,1) == PREFIX || msg.author.bot) return

    const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Check prescence of this command
    if (!command) return;

    // Check if the command requires args, if yes but not provided, send warning msg
    if(command.args && !args.length){
        let reply = `You didn't provide any arguments, ${msg.author}`

        if(command.usage) reply+= `\nThe proper usage would be: \n\`${PREFIX}${command.name} ${command.usage}\``
        return msg.channel.send(reply)
    }

    // Check for availability of command in DM
    if(command.guildOnly && msg.channel.type == 'dm') return msg.reply(`The command \`${PREFIX}${command.name}\` is not available in DMs!`)
    
    // Cooldown for commands checking
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 1)* 1000

    if(timestamps.has(msg.author.id)){
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount
        
        if(now < expirationTime){
            const timeLeft = Math.round((expirationTime - now) / 1000); // in seconds
            const seconds = timeLeft % 60
            const minutes = ((timeLeft-seconds) % 3600) / 60
            const hours = Math.trunc(timeLeft / 3600)

            let reply = `The command \`${commandName}\` is on cooldown for `
            if(hours > 0) reply += hours+'h '
            if(minutes > 0) reply += minutes+ 'm '
            if(seconds > 0) reply += seconds+ 's '
            return msg.reply(reply)
        }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    // Execute the command
    try{
        command.execute(msg,args)
    }catch(err){
        console.error(err)
        msg.reply("There was an error trying to execute that command")
    }
});

client.login(process.env.TOKEN);