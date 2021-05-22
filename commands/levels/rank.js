const Discord = require('discord.js')
const Levels = require('discord-xp')
module.exports = {
  name: "rank",
  aliases: [],
  usage: "HOW TO USE THE COMMAND",
  description: "WHAT THE COMMAND DOES",
  run: async (client, message, args) => {


const canvacord = require("canvacord");

const member = message.mentions.users.first() || message.author;

const userData = await Levels.fetch(member.id, message.guild.id, true);

if (!userData.level) return message.channel.send(`${member} has no levels!`);


const requiredXp = Levels.xpFor(userData.level +1)



const rank = new canvacord.Rank()
.renderEmojis(true)
    .setAvatar(member.displayAvatarURL({ format: "png" }))
    .setRank(userData.position)
    .setLevel(userData.level)
    .setCurrentXP(userData.xp)
    .setRequiredXP(requiredXp)
    .setStatus(member.presence.status)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(member.username)
    .setDiscriminator(member.discriminator)
    .setBackground("IMAGE", `${client.config.rankImage}`)
    .setProgressBar([`${client.config.rankColor}`], "GRADIENT", true)
    .setOverlay(`${client.config.rankColor}`, 0.2, true)
    

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });


  }
}