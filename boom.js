module.exports = {
    prepare: function (args, MessageEmbed, message) {
    //helper
    function performBoom() {
        let boomGifs = [
            "https://media1.tenor.com/images/f8c9086b7d8baf32a2648d055a9acbfc/tenor.gif",
            "https://media1.tenor.com/images/0f837fcbffca4ba481f07df2abd7b73f/tenor.gif",
            "https://media1.tenor.com/images/2eb91897ed939dcfed0a0f1705cdd9c7/tenor.gif",
            "https://media1.tenor.com/images/b62c92de2384d613f908f9e650d188db/tenor.gif",
            "https://media1.tenor.com/images/b19fe8078c0ca25db66e20494d74fbee/tenor.gif",
            "https://media1.tenor.com/images/57e6819532a209810b49b3749bef0ae1/tenor.gif",
            "https://media1.tenor.com/images/d261b336b301d5357ef1f3b9fe98ca9b/tenor.gif",
            "https://media1.tenor.com/images/bbc8c9101e5b84ca6f78d43a5153f335/tenor.gif",
            "https://media1.tenor.com/images/abf6c230129a0efcba305e614146a935/tenor.gif",
            "https://media1.tenor.com/images/9311ede3b76fd3b5ecfe0238ba6e5bac/tenor.gif",
            "https://media1.tenor.com/images/b77d24edbf1df6d84411b653ab80926e/tenor.gif",
            "https://media1.tenor.com/images/267197ca21a5287d93d997c2c4c0ae7d/tenor.gif",
            "https://media1.tenor.com/images/7246892de5db5ea813fa9a3c89da3d80/tenor.gif",
            "https://media1.tenor.com/images/927aa5dfca7687963eacb9b4eb11422e/tenor.gif",
            "https://media1.tenor.com/images/3c2d17dd3513095d0c3c346d7cb35d5d/tenor.gif",
            "https://media1.tenor.com/images/6732bf96f2e1f7453040259944bc0c5e/tenor.gif",
            "https://media1.tenor.com/images/552141bee99579769c1c64601963511a/tenor.gif",
            "https://media1.tenor.com/images/cde7e9f7c431082ab77cb7b9c748761f/tenor.gif",
            "https://media1.tenor.com/images/1b0aa33f1d0b9e3f81f72f8930f17c7f/tenor.gif",
            "https://media1.tenor.com/images/9e138d71b5f8f83bc9d191babaff0397/tenor.gif",
            "https://media1.tenor.com/images/482351a6c0b420cfafbd4541ac5905b4/tenor.gif",
            "https://media1.tenor.com/images/c75a6a26d9fd54413f49fc6fb1de1d00/tenor.gif",
            "https://media1.tenor.com/images/e6b6a24b694af6e103e11d8fe04d2824/tenor.gif",
            "https://media.tenor.com/images/560913e999e5fcf10b16123a50b75fd1/tenor.gif",
            "https://media1.tenor.com/images/88707e6981039251346732a4f4245cfe/tenor.gif",
            "https://media1.tenor.com/images/61b60d1c204911741301af52b5ce7c67/tenor.gif",
            "https://media.tenor.com/images/2eb23812be4d796737f1998b8ad78e1b/tenor.gif"
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

        //lists which how many booms there are in total
        let randomBoom = boomGifs[Math.floor(Math.random() * 3)];
        //let randomBoom = boomGifs[Math.floor(Math.random() * countBooms)];
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

    let mode = 0;
    if (!args || !args.length) {
        console.log('Command did not include any arguments');
        // array or array.length are falsy
        console.log('Switched to mode 1');
        mode = 1;
    }

    else if (args && args.length && args.some(isNaN)) {
        //array exists with letters
        console.log('Switched to mode 2');
        mode = 2;
    }

    else if (args.length > 1 && !args.some(isNaN)) {
        //array can have only 1 element
        console.log('Switched to mode 3');
        mode = 3;
    }

    else if (args && args[0] < 1 && !args.some(isNaN)) {
        //WORKING
        //can't have a 0 or negative number
        console.log('Switched to mode 4');
        mode = 4;
    }

    else if (args && args[0] > 8 && !args.some(isNaN)) {
        //WORKING
        //reached boom limit
        console.log('Switched to mode 5');
        mode = 5;
    }

    else if (args && args.length && !args.some(isNaN)) {
        //working version
        console.log('Switched to mode 6');
        mode = 6;
    }

    switch (mode) {
        case 1:
            //if there are no arguments then just stick to one boom
            performBoom();
            break;
        case 2:
            console.log('Used letters when looking for numbers');
            message.reply('There is an error, only numbers allowed. Please try again!\n Syntax: !boom [amount]');
            break;
        case 3:
            //too many arguments
            console.log('Too many arguments');
            message.reply('There is an error, only one parameter is accepted. Please try again!\n Syntax: !boom [amount]');
            break;
        case 4:
            console.log('Used negative number');
            message.reply('There is an error, only positive numbers allowed. Please try again!\n Syntax: !boom [1-8]');
            break;
        case 5:
            //over maximum boom limit
            console.log('Over boom limited');
            message.reply('There is an error, there is only a maximum of 8 booms allowed. Please try again!\n Syntax: !boom [1-8]');
            break;
        case 6:
            //working version
            console.log('Total of ',args[0],' booms requested.');
            for (i = 0; i < args[0]; i++) {
                console.log('Boom # ', i + 1);
                performBoom();
            }
            break;

        default:
            message.reply("Something went wrong. Try again.");
            break;
    }
}
};
