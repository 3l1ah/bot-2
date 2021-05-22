const Levels = require('discord-xp')
const Discord = require('discord.js')

module.exports = {
  name: "leaderboard",
  aliases: ["ranks"],
  usage: "HOW TO USE THE COMMAND",
  description: "WHAT THE COMMAND DOES",
  run: async (client, message, args) => {

const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, client.config.leaderboardRanks); // We grab top 10 users with most xp in the current server.

if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.


const embed = new Discord.MessageEmbed()
.setColor(client.config.leaderboardColor)
.setTitle("Leaderboard")
.setDescription(`${lb.join("\n\n")}`)
message.channel.send(embed);

  }
}