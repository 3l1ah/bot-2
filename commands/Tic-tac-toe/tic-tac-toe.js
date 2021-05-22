const TicTacToe = require('discord-tictactoe');

const game = new TicTacToe({ language: 'en' })

module.exports = {
  name: "tic-tac-toe",
  aliases: ["ttt"],
  usage: "ttt",
  description: "play a game of tic-tac-toe",
  run: async (client, message, args) => {
  
  game.handleMessage(message);
  
  
  }
}