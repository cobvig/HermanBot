const Discord = require("discord.js");

const TOKEN = process.env.BOT_TOKEN;
const PREFIX = "//";

var fortunes = [
    "Ja",
    "Nej",
    "~~",
    "(╯°□°）╯︵ ┻━┻"
];

var greetings = [
    "Hej",
    "Hallå",
    "Välkommen",
    "Yo",
    "Ey",
    "Hejsan",
    "Tjena",
    "Tja ba",
    "Tjenixen"
];

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("ready");
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "entrehallen").sendMessage(member.displayName + " gick med i servern");

    member.addRole(member.guild.roles.find("name", "normies"));
});

bot.on("message", function(message){
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.sendMessage("Pong!");
            break;
        case "info":
            message.channel.sendMessage("*HermanBot* ***B1***  made by **cobvig#3825**");
            break;
        case "8ball":
            if (args[1]) {
                message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            } else {
                message.channel.sendMessage("Kan ej läsa det :(")
            }
            break;
        case "embed":
            var embed = new Discord.RichEmbed()
                .addField("Titel", "Beskrivning", true)
                .addField("Titel 2", "Beskrivning 2", true)
                .addField("Titel 3", "Beskrivning 3")
                .addField("Titel 4", "Beskrivning 4", true)
                .addField("Titel 5", "Beskrivning 5")
                .setColor(0xfe6e78)
                .setFooter("En sko")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "mention":
            message.channel.sendMessage(message.author.toString() + " hej");
            break;
        default:
            message.channel.sendMessage("Bad Command :(");
    }
});

bot.login(TOKEN);

// Express webserver

const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

 // pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
  http.get('http://hermanbot.herokuapp.com');
}, 900000);
