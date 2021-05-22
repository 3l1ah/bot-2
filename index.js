const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const config = require('./config.json')
const chalk = require('chalk');


client.on("ready", () => {
  console.clear();
  console.log(chalk.bold.blue(`${config.ready}`))
});

client.config = config


client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.queue = new Map();



const Categories = ["Tic-tac-toe", "levels", "mod"]; //Commands => Category => Command

Categories.forEach(async function(Category) { //
    fs.readdir(`./commands/${Category}`, async function(error, files) {
      if (error) throw new Error(`Error In Command - Command Handler\n${error}`);
      files.forEach(async function(file) {
        if (!file.endsWith(".js")) throw new Error(`A File Does Not Ends With .js - Command Handler!`);
        let command = require(`./commands/${Category}/${file}`);
   
        if (!command.name || !command.aliases) throw new Error(`No Command Name & Command Aliases In A File - Command Handler!`);
        if (command.name) client.commands.set(command.name, command);
        if (command.aliases) command.aliases.forEach(aliase => client.aliases.set(aliase, command.name));
        if (command.aliases.length === 0) command.aliases = null;
      });
    });
});

client.on("message", async message => {

  let Prefix = config.prefix

  if (message.author.bot || !message.guild || message.webhookID) return;

  if (!message.content.startsWith(Prefix)) return;

  let args = message.content.slice(Prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return console.log(chalk.bold.redBright(`${config.noCommand}`));



  if (command) {
    command.run(client, message, args);
  };
});



client.login(config.token).catch(err => console.log(`Invalid Token Provided!`));



const Levels = require('discord-xp')

Levels.setURL(config.mongoDB)

client.on("message", async message => {
    if (!message.guild) return;
    if (message.author.bot) return;



const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`<@${message.author.id}> leveled up to level ${user.level}! Keep it going!`);
    }
})