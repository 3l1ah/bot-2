module.exports = {
  name: "kick",
  aliases: [],
  usage: "kick <member>",
  description: "kick a member",
  run: async (client, message, args) => {
  

  //Checks If User Has Kick Members Permission, If Not Sends Error Message.
   if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("No Permissions!");
  

//Finds the first person mentioned.
let user = message.mentions.members.first();

//If No User Mentioned, Returns The Error Message.
if (!user) return message.channel.send("Please Mention A User!");

//If The Mentioned User Has The Permission Kick Members, Returns Error Message.
if (user.hasPermission('KICK_MEMBERS')) return message.channel.send("You Are Unable To Kick That User!");



//Kicks The User.
user.kick()

//Sends Completed Message.
message.channel.send(`**${user}** Was Kicked!`)

  
  }
}