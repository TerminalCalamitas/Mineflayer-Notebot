var mineflayer = require("mineflayer");
var fs = require("fs");
var cmd_handler = require("./command-handler.js");
var util = require("./util.js");

var config = require("./config.json");

var botVersion = "1.2";

var options = {
    auth: config.bot.auth || "microsoft",
    host: config.bot.host || "195.90.214.23",
    port: config.bot.port || 20262,
    checkTimeoutInterval: 5555*1000,
    plugins: {
      "bed":false,
      "book":false,
      "boss_bar":false,
      "chest":false,
      "command_block":false,
      "craft":false,
      "creative":false,
      "digging":false,
      "dispenser":false,
      "enchantment_table":false,
      "experience":false,
      "furnace":false,
      "health":false,
      "inventory":false,
      "rain":false,
      "scoreboard":false,
      "sound":false,
      "title":false,
      "villager":false//maybe some more?
    }
}
console.log("createBot")
var bot = mineflayer.createBot(options);
console.log("handle commands")
cmd_handler();

bot.on("login", () => {
  console.log(`(${bot.username}) logged in!`);
  bot.chat("AHHHH, It's midnight and everything is going wrong")
  bot.chat("My sanity? Optional")
});

bot.on("chat", (username, message) => {
  console.log(`[chat] <${username}> ${message}`);

  if (message.startsWith(cmd_handler.prefix)) {
    let args = message.slice(cmd_handler.prefix.length).split(" ");
    let command = args.shift();

    if (cmd_handler.isCommand(command)) {
      let output = cmd_handler.execute(bot, command, username, args);

      if (output.status == "success") {
        if (typeof output.message == "string")
          bot.chat(util.infoMessage(output.message));
      } else if (output.status == "error") {
        if (typeof output.message == "string")
          bot.chat(util.errorMessage(output.message));
      }
    }
  }

  /*
	if (message.startsWith(cmd_handler.prefix)) {
		let args = message.split(" ");
    let command = args.shift().slice(cmd_handler.prefix.length);
    
    let output = cmd_handler.execute(command, username, args, bot);
    if (output.status == "error") {
      let error = output.message;
      //let code = output.code;
      bot.chat(util.errorMessage(error));
    }
  }
  */
  
});

module.exports.getBot = () => {
	return bot;
}