const ytdl = require('ytdl-core')

module.exports = {
    name:'play',
    description: 'Play music!',
    args: true,
    guildOnly: true,
    aliases:['p'],
    cooldown:1,
    usage:'<url>',
    async execute(message, args){
        const url = args[0]
        const voiceChannel = message.member.voice.channel

        if(!voiceChannel) return message.channel.send(message.author.username+', please join a voice channel first')
        let validate = await ytdl.validateURL(url)

        if(!validate){
            return message.channel.send(message.author.username+', sorry, we cannot find this music video, please input a proper url!')
        }

        voiceChannel.join().then(conn=>{
            const stream = ytdl(url, { filter: 'audioonly' })
            const dispatcher = conn.play(stream)

            dispatcher.on('finish', () => voiceChannel.leave())
        })
    }
}