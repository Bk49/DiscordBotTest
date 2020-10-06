const axios = require('axios')
const {PREFIX} = require('../config.json')
const RANDOM = require('../ExternalFuncs/random')

module.exports = {
    name:'daily',
    description: 'Get daily money!',
    args: false,
    usage:'',
    guildOnly: false,
    aliases:['dly'],
    cooldown:86400,
    execute(message, args){
        const usertag = message.author.username+'%23'+message.author.discriminator

        const link = `http://discord-currency.herokuapp.com/user`
        message.channel.startTyping()
        axios.get(`${link}?usertag=${usertag}`).then(res=>{
                console.log('yes')
                const money = RANDOM.getMoney(1000, 5000)
                axios.put(`${link}/money?usertag=${usertag}&money=${money}`).then(res=>{
                    message.channel.send(`You've claimed your daily reward! Amount claimed : $${money}.00`)
                }).catch(err=>{
                    message.channel.send(`An error has occured to claim your daily reward`)
                })
        }).catch(err=>{
            message.channel.send(`An error has occured, please make sure you had register the user using ${PREFIX}register`)
        }).finally(()=>{
            message.channel.stopTyping(true)
            return
        })
    }
}