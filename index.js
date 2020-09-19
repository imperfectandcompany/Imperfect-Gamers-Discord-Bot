const reactionRoles = require("./util/reactionroles");
//discord module for node (dependency)

//temp config require
let config = require("./config.js");
//settings object
const settings = {

	//push config variables into a settings object
	prefix: config.PREFIX,
	BOT_TOKEN: config.BOT_TOKEN

}
// Extract the required classes from the discord.js module
const { Collection, Client } = require('discord.js');

//creates a new discord.client and assigns it to the constant client
const client = new Client();

//default description, can be customized based on the command

client.login(settings.BOT_TOKEN);
//client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
	//push settings into client object
	client.settings = settings;
	console.log(client.user.tag + " has logged in.");
	fetchCommands();
	reactionRoles(client);
});


//automatic command handler
function fetchCommands() {
	//create new command collection
	client.command = new Collection();
	//read ./commands dir
	require("fs").readdir(__dirname+"/commands", (err, file) => {
		if (err) console.error(err); //log on error
		//get all .js file in ./commands and remove all other files from the array
		let jsfile = file.filter(f => f.split(".").pop() === "js");
		//return if no .js files found
		if (jsfile.length <= 0) return console.log("Can't find any command files.");
		//loop trough all .js files and put them into the command collection
		jsfile.forEach(file => {
			let props = require(__dirname+`/commands/${file}`);
			console.log(file + " loaded!");
			client.commands.set(props.name, props);
		});
	});
}


//command handler
client.on("message", message => {
	//discord sends notifications on notifications using the on method
	//on method takes two arguments: name of the event to wait for, and a function to run every time that event occurs
	if (message.author.bot) return;
	//checks to see if the author of a message is a bot, if so - don't process
	if (!message.content.startsWith(client.settings.prefix)) return;
	//the !message means if the message content DOESN'T start with the prefix, don't process
	const commandBody = message.content.slice(client.settings.prefix.length);
	//removes the prefix from message content and then assign to command body(second part, the one after prefix)
	let args = commandBody.split(' ');
	//takes the command body and puts it into an array of substrings using ' ' < space to identify between command and
	//arguments
	const command = args.shift().toLowerCase();
	//leaves out the first element in the args array, which is the command name, then makes it lowercase, and leaves
	//the arguments left to be assigned to the command constant.

	//check if command exists and run
	if (client.commands.get(command)) client.commands.get(command).run(args, message);

	//#####COMMAND ~ COMMANDS#####
	/*if (command === "commands") {
		message.author.send("COMMANDS\n");
		message.author.send("\n!boom ~ sends a random explosion");
		//message.author.send("\n!army ~ send a random army")
		//private messages user
	}

	//#####COMMAND ~ BOOM#####
	if (command === "boom") {
		boom.prepare(args, message);
	}

	//#####COMMAND ~ ARMY#####
	//if (command === "army") {
	//army(args, MessageEmbed, message);
	//}
	*/
});
