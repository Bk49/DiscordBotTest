const RANDOM = require("../ExternalFuncs/random")

module.exports = {
	name: 'quote',
	description: 'Obtain a random quote',
	execute(message, args) {
		RANDOM.getQuotePromise().then(data => {
            const QUOTE = JSON.parse(data.slice(2, data.length-1)).quoteText
            message.channel.send(QUOTE)
        }).catch(err => console.log(err))
	},
};