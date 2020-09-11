const Discord = require("discord.js");
//discord module for node (dependency)
const config = require("./config.json");
//config file with the BOT_TOKEN
const prefix = "!";
//assigns the value "!" to the constant prefix
const client = new Discord.Client();
//creates a new discord.client and assigns it to the constant client

// Extract the required classes from the discord.js module
const {
    Client,
    MessageEmbed
} = require('discord.js');

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
    let args = commandBody.split(' ');
    //takes the command body and puts it into an array of substrings using ' ' < space to identify between command and
    //arguments
    const command = args.shift().toLowerCase();
    //leaves out the first element in the args array, which is the command name, then makes it lowercase, and leaves
    //the arguments left to be assigned to the command constant.


    function argValidator() {
        let mode = 0;
        if (!args || !args.length) {
            console.log('Command did not include any arguments');
            // array or array.length are falsy
            mode = 1;
        }

        if (args && args.length && args.some(isNaN)) {
            //array exists with letters
            mode = 2;
        }

        if (args.length > 1 && !args.some(isNaN)) {
            //array can have only 1 element
            mode = 3;
        }

        else if (args && args[0] > 8 && !args.some(isNaN)) {
            //reached boom limit
            mode = 4;
        }

        else if (args && args.length && !args.some(isNaN)) {
            //working version
            mode = 5;
        }

        switch (mode) {
            case 1:
                //if there are no arguments then just stick to one boom
                boom();
                break;
            case 2:
                message.reply('There is an error, only numbers allowed. Please try again!\n Syntax: !boom [amount]');
                break;
            case 3:
                //too many arguments
                message.reply('There is an error, only one parameter is accepted. Please try again!\n Syntax: !boom [amount]');
                break;
            case 4:
                //over maximum boom limit
                message.reply('There is an error, there is only a maximum of 8 booms allowed. Please try again!\n Syntax: !boom [0-8]');
                break;
            case 5:
                //working version
                for (i = 0; i < args[0]; i++) {
                    boom();
                }
                break;
            default:
                message.reply("Something went wrong. Try again.");
                break;
        }
    }


    function boom() {
        let boomGifs = [
            "https://media1.tenor.com/images/f8c9086b7d8baf32a2648d055a9acbfc/tenor.gif",
            "https://media1.tenor.com/images/0f837fcbffca4ba481f07df2abd7b73f/tenor.gif",
            "https://media1.tenor.com/images/2eb91897ed939dcfed0a0f1705cdd9c7/tenor.gif",
            "https://media1.tenor.com/images/b62c92de2384d613f908f9e650d188db/tenor.gif"
        ];
        //array full of booms, in the future use a api so the possibilities of booms are endless

        let countBooms = boomGifs.length;
        //counts arrays

        console.log(`Available Booms`);
        let printBooms = boomGifs.map(individualBooms => {
            console.log(
                `Boom: ${individualBooms}`
            );
        });
        //map function allows me to print them one by one

        console.log('Total of ', countBooms, ' booms.');
        //lists which how many booms there are in total

        let randomBoom = boomGifs[Math.floor(Math.random() * countBooms)];
        //countbooms helps me set a max based off the array
        //selects random index

        console.log('Selected boom: ', randomBoom);
        //shows which boom was selected

        const boomToString = randomBoom.toString();
        //converts selected element of the array to a string

        const embed = new MessageEmbed()
            .setImage(boomToString)
            //populated from above
            .setDescription('KABOOM!')
            .setColor('0xff0000');
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(embed);
        console.log('Message sent in ', timeTaken, 'ms');
        //diagnostics (for the fuuuuuuuture)
    }

    //#####COMMAND ~ COMMANDS#####
    if (command === "commands") {
        message.author.send("COMMANDS\n!boom ~ sends a random explosion")
        //private messages user
    }


    //#####COMMAND ~ BOOM#####
    if (command === "boom") {
        !argValidator();
    }


});

client.login(config.BOT_TOKEN);
