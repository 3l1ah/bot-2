const Discord = require('discord.js')
const Levels = require('discord-xp')
module.exports = {
  name: "give-xp",
  aliases: [],
  usage: "HOW TO USE THE COMMAND",
  description: "WHAT THE COMMAND DOES",
  run: async (client, message, args) => {


   if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("No Permissions!");


let user = message.mentions.members.first();


if (!user) return message.channel.send("Please mention a user!");

if (!args[1]) return message.channel.send("Please enter an amount to add!");

if (isNaN(args[1])) return message.channel.send(`Unable to add **${args[1]}** to ${user}`);

Levels.appendXp(user.id, message.guild.id, args[1]);


message.channel.send(`Added **${args[1]}** to ${user}`)
  }
}