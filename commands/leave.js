const { VoiceChannel } = require('discord.js')
const ytdl = require('ytdl-core')

module.exports = {
    name:'leave',
    description: 'Leave a voice channel',
    args: false,
    usage:'',
    guildOnly: true,
    cooldown:3,
    aliases:['l','lv','dc','disconnect'],
    cooldown:1,
    async execute(message, args){
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send(message.author.username+', please join a voice channel first')
        else{
            vc.leave()
            return message.channel.send('Leaving the channel..')

        }
    }
}