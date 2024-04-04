require('dotenv').config();
const token = process.env.BOT_TOKEN;
const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "."; // Prefix for bot commands

let timers = {}; // Object to store timers

const token = process.env.BOT_TOKEN;

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        // Add more intents as needed based on your bot's functionality
    ]
});


client.on('message', message => {
    if (message.author.bot) return; // Ignore messages from bots
    if (!message.content.startsWith(PREFIX)) return; // Ignore messages without prefix

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Timer command
    if (command === 'timer') {
        const subCommand = args[0].toLowerCase();

        if (subCommand === 'start') {
            const timerName = args.slice(1).join(' ');
            if (!timers[timerName]) {
                timers[timerName] = setInterval(() => {
                    message.channel.send(`Timer "${timerName}" is running.`);
                }, 1000);
                message.channel.send(`Timer "${timerName}" started.`);
            } else {
                message.channel.send(`Timer "${timerName}" is already running.`);
            }
        } else if (subCommand === 'pause') {
            const timerName = args.slice(1).join(' ');
            if (timers[timerName]) {
                clearInterval(timers[timerName]);
                delete timers[timerName];
                message.channel.send(`Timer "${timerName}" paused.`);
            } else {
                message.channel.send(`Timer "${timerName}" is not running.`);
            }
        }
    }

    // Flip coin command
    if (command === 'flipcoin') {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        message.channel.send(`Flipping coin... It's ${result}!`);
    }
});

client.login(token);