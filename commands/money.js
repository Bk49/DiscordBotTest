const axios = require('axios')

module.exports = {
    name:'money',
    description:'Get the money left for you or the pinged user',
    args: false,
    usage:'<user | null>',
    cooldown:2,
    guildOnly: false,
    aliases:['$', 'balance'],
    execute(message,args){
        const user = message.mentions.users.first() || message.author
        const usertag = user.username + '%23' +user.discriminator
        message.channel.startTyping()
        axios.get(`http://discord-currency.herokuapp.com/user/money?usertag=${usertag}`).then(res=>{
            message.channel.send(`${user} is left with $${res.data[0].money.toFixed(2)}`)
        }).catch(err=>{
            message.channel.send(`The user with Discord tag ${user} is not found in the database!`)
        }).finally(()=>{
            message.channel.stopTyping()
            return
        })
    }
}