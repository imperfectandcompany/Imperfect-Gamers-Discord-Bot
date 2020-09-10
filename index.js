const Discord = require("discord.js");
//discord module for node (dependency)
const config = require("./config.json");
//config file with the BOT_TOKEN
const prefix = "!";
//assigns the value "!" to the constant prefix
const client = new Discord.Client();
//creates a new discord.client and assigns it to the constant client

const user = "message.author";

// Extract the required classes from the discord.js module
const { Client, MessageEmbed } = require('discord.js');

    //default description, can be customized based on the command

//command handler

client.on("message", function(message) {
    //discord sends notifications on notifications using the on method
    //on method takes two arguments: name of the event to wait for, and a function to run every time that event occurs
    if (message.author.bot) return;
    //checks to see if the author of a message is a bot, if so - don't process
    if (!message.content.startsWith(prefix)) return;
    //the !message means if the message content DOESN'T start with the prefix, don't process
    const commandBody = message.content.slice(prefix.length);
    //removes the prefix from message content and then assign to command body(second part, the one after prefix)
    const args = commandBody.split(' ');
    //takes the command body and puts it into an array of substrings using ' ' < space to identify between command and
    //arguments
    const command = args.shift().toLowerCase();
    //leaves out the first element in the args array, which is the command name, then makes it lowercase, and leaves
    //the arguments left to be assigned to the command constant.


    if (command === "commands") {
        message.author.send("COMMANDS\n!boom ~ sends an explosion")
    }



    //#####COMMAND ~ BOOM#####
    if (command === "boom") {

        let boomGifs = [
            "https://media1.tenor.com/images/f8c9086b7d8baf32a2648d055a9acbfc/tenor.gif",
            "https://media1.tenor.com/images/0f837fcbffca4ba481f07df2abd7b73f/tenor.gif",
            "https://media1.tenor.com/images/2eb91897ed939dcfed0a0f1705cdd9c7/tenor.gif",
            "https://media1.tenor.com/images/b62c92de2384d613f908f9e650d188db/tenor.gif"
        ];

        let randomBoom = boomGifs[Math.floor(Math.random() * 4)];

        const boomToString = randomBoom.toString();
        const embed = new MessageEmbed()
            .setImage(boomToString)
            .setTitle('Imperfect Gamers')
            .setDescription('KABOOM!')
            .setColor('0xff0000');
        message.reply(embed);
    }

});

client.login(config.BOT_TOKEN);

