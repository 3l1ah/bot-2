module.exports = {
  name: "ban",
  aliases: [],
  usage: "ban <member>",
  description: "ban a member",
  run: async (client, message, args) => {
  

  //Checks If User Has Ban Members Permission, If Not Sends Error Message.
   if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("No Permissions!");
  

//Finds the first person mentioned.
let user = message.mentions.members.first();

//If No User Mentioned, Returns The Error Message.
if (!user) return message.channel.send("Please Mention A User!");

//If The Mentioned User Has The Permission Ban Members, Returns Error Message.
if (user.hasPermission('BAN_MEMBERS')) return message.channel.send("You Are Unable To Ban That User!");



//Bans The User.
user.ban()

//Sends Completed Message.
message.channel.send(`**${user}** Was Banned!`)

  
  }
}