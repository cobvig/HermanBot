const Discord = require("discord.js");

const TOKEN = process.env.BOT_TOKEN;

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("ready");
});

bot.on("message", function(message){
    if (message.author.equals(bot.user)) return;

    if (message.content == "ja") {
        message.channel.sendMessage("nej");
    }
});

bot.login(TOKEN);