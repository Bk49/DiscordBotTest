module.exports = {
	name: 'console',
	description: 'Display the client / author / target user details in console!',
	execute(message, args) {
        if(args[0] == "client" || args.length == 0) console.log(message.client)
        else if(args[0] == 'author') console.log(message.author)
	},
};