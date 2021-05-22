module.exports = {
  name: "clear",
  aliases: [],
  usage: "clear <amount>",
  description: "clear chat",
  run: async (client, message, args) => {


  //Checks If User Has Ban Members Messages, If Not Sends Error Message.
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("No Permissions!");


//Checks If An Amount Was Said.
if (!args[0]) return message.channel.send("Please Enter An Amount To Clear!");

//Gets The Number Specified.
const deleteCount = parseInt(args[0], 10);

//Checks If The Number Is Bigger The 1 And Is Less The 100.
if (!deleteCount || deleteCount < 1 || deleteCount > 100) return message.channel.send("Please Enter An Amount Between 1 And 100");



//Deletes The Messages, If Error, Sends In Chat.
message.channel.bulkDelete(deleteCount + 1).catch(error => message.channel.send("Error Deleting Messages!"));

message.channel.send("Messages Deleted!").then(msg => {
                msg.delete({ timeout: 	
5000 /*time unitl delete in milliseconds*/});
            })

  }
}