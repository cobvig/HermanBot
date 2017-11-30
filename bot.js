const Discord = require("discord.js");
const color = require('./color.js');

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

var choose = function(arr) {
    var chosen_index = Math.floor(Math.random() * arr.length);
    return arr[chosen_index];
};

var rainbowColor = function(role, c) {
    role.setColor(c).then(console.log(c)).catch(console.error);
};

bot.on("ready", function() {
    console.log("ready");
    var msgs = [
        "dun",
        "Köper Strömming Goods",
        "Av cobvig#3825",
        "bara lite",
        "ja",
        "wang",
        "cmon",
        "ezreal",
        "crackar fbi säkerhets kod",
        "unity engine",
        "colormatic",
        "nu ute för apple 2 platformer",
        "with my w",
        "yes"
    ];
    var changePlayingFn = function() {
        bot.user.setGame(choose(msgs));
    };
    setInterval(changePlayingFn, 120000);
    var rainbowRole = bot.guilds.array()[0].roles.get(process.env.RAINBOW_ROLE_ID);
    var rc = 0;
    setInterval(function() {
        rainbowColor(rainbowRole, color.hex4hue(rc));
        rc = (rc + 3) % 360;
    }, 200);
    //rainbowColor(rainbowRole, 317);  
});

bot.on("guildMemberAdd", function(member) {
    var read_more_channel = bot.channels.get(process.env.READ_MORE_ID);
    member.guild.channels.get(process.env.GENERAL_ID).sendMessage(member.displayName + " joinade, läs " + read_more_channel + " pl0x");

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
                message.channel.sendMessage(choose(fortunes));
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
        case "h4h":
            var c = args[1];
            message.channel.sendMessage(color.hex4hue(c));
            break;
        default:
            message.channel.sendMessage("Bad Command :(");
    }
});

bot.login(TOKEN);
