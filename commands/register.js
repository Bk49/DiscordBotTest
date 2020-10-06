const axios = require('axios')

module.exports = {
    name:'register',
    description: 'Registers for an account for the currency system',
    args: false,
    usage:'',
    guildOnly: false,
    cooldown:86400,
    execute(message, args){
        const usertag = message.author.username+'%23'+message.author.discriminator
        const link = `https://discord-currency.herokuapp.com/user?usertag=${usertag}`
        message.channel.startTyping()
        axios.get(link).then(res=>{
            message.channel.send('The user has already been created!')
        }).catch(err=>{
            axios.post(link).then(res=>{
                message.channel.send('Successfully created user!')
            })
        }).finally(()=>{
            message.channel.stopTyping(true)
            return
        })
    }
}