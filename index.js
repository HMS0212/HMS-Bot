//Important Stuff
const Discord = require("discord.js")
const keepAlive = require("./server")
const weather = require('weather-js')
const fetch = require("node-fetch");
const bot = new Discord.Client();
const db = require('quick.db')
const PREFIX="!"
const Enmap = require("enmap")
const canvacord = require("canvacord")
bot.points = new Enmap({ name: "points" });
const DisTube = require('distube');
const distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});
const defaultSettings = {	
  invites: "off",
  levels: "off"
}
//Commands Stuff
const fs = require('fs');
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./src/${file}`);
  bot.commands.set(command.name, command);
}
//Ready
bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.tag}!`)
  bot.user.setActivity(`${bot.guilds.cache.size} servers and ${bot.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)} members`,{ type: 'WATCHING' })
  })
//Commands
bot.on('message', async message => {
if (!message.content.startsWith(PREFIX)) return;
let args = message.content.slice(PREFIX.length).split(/ +/);
let command = args.shift().toLowerCase()
//Ping
if (command === "ping"){
bot.commands.get('ping').execute(message, args, Discord)
}
//Quote
if (command === "quote"){
  bot.commands.get('quote').execute(message, args, Discord)
}
//Weather
if (command === "weather") {
  bot.commands.get("weather").execute(message, args, Discord, weather)
}
//8ball Command
if (command === "8ball") {
  bot.commands.get('8ball').execute(message, args, Discord)
}
//Send DMs
if(command==="dm"){
  bot.commands.get('dm').execute(message, args, Discord)
}
//Help
if(command==="help"){
  bot.commands.get('help').execute(message, args, Discord)
}
//Purge
if (command === "delete") {
  if (message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")||message.author.id==='782391596648759296') {
	bot.commands.get("delete").execute(message, args)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
//Flight Status
if (command === "flight") {
  bot.commands.get('flight').execute(message, args, Discord)
}
//Joke
if (command === "joke"){
  bot.commands.get('joke').execute(message, args, Discord)
}
//Unban
if (command === "unban") {
  if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")||message.author.id==='782391596648759296'){
    bot.commands.get("unban").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
//Ban
if (command === "ban") {
  if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")||message.author.id==='782391596648759296'){
    bot.commands.get("ban").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
//Kick
if (command === "kick") {
  if (message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")||message.author.id==='782391596648759296'){
    bot.commands.get("kick").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
//Add Role
if (command === "addrole") {
  if (message.member.hasPermission("MANAGE_ROLES","ADMINISTRATOR")||message.author.id==='782391596648759296') {
	bot.commands.get("addrole").execute(message, args, Discord)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
//Remove Role
if (command === "removerole") {
  if (message.member.hasPermission("MANAGE_ROLES","ADMINISTRATOR")||message.author.id==='782391596648759296') {
	bot.commands.get("removerole").execute(message, args, Discord)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
//Avatar
if (command === "avatar"){
  bot.commands.get('avatar').execute(message, args, Discord)
}
//Create Channel
if (command === "cchannel"){
  if (message.member.hasPermission("MANAGE_CHANNELS","ADMINISTRATOR")){
  bot.commands.get('cchannel').execute(message, args, Discord)
  } else{
    message.channel.send("You can't use that!");
  }
}
//Delete Channel
if (command === "dchannel"){
  if (message.member.hasPermission("MANAGE_CHANNELS","ADMINISTRATOR")){
    bot.commands.get('dchannel').execute(message, args, Discord)
  }else{
    message.channel.send("You can't use that!")
  }
}
//Restart Bot
if (command === "restart"){
  if (message.author.id==='782391596648759296') {
  bot.commands.get('restart').execute(message, args, Discord)
  } else{
    message.channel.send("You can't use that!")
  }
}
});
//MUSIC COMMANDS
bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play"||command == "p"){
        distube.play(message, args.join(" "));
    }
    if (command=="loop"||command=="repeat"){
        distube.setRepeatMode(message, parseInt(args[0]));
        message.channel.send("Looping queue")
    }
    if (command == "dc"||command == "die") {
        distube.stop(message);
        message.channel.send("Disconnected");
    }
    if (command == "skip"||command == "next"){
        distube.skip(message);
        message.channel.send("Song Skipped")
    }
    if (command == "queue"||command == "q") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }
    if (command == "jump"){
        distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Invalid song number."));
        message.channel.send(`Jumped to the ${args[0]}th song`)
    }
    if (command == "pause"||command == "stop"){
        distube.pause(message)
        message.channel.send("Song Paused")
    }
    if (command == "resume"){
        distube.resume(message)
        message.channel.send("Song Resumed")
    }
    if (command == "autoplay") {
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
    if (command == "shuffle"){
        distube.shuffle(message);
        message.channel.send("Queue Shuffled")
        }
    if (command == "volume"){
        distube.setVolume(message, args[0]);
        message.channel.send(`Volume set to ${args[0]}%`)
    }
});
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("finish", (message) => 
  message.channel.send("No more song in queue"));
//Snipe
const sniping = require("./src/snipe");
sniping(bot)
//YT and Twitch Promo and Disable Invite Links
bot.on("message", message => {
  if (message.content.includes("uploaded a new youtube video!")&&message.guild.id == '800469764341366795') {
    message.channel.send("If you want your YouTube Channel to be shown here, ping NLHMS#2100.<:youtube:863441892947132436>");
  } 
  else if (message.content.includes("is now streaming")&&message.guild.id == '800469764341366795') {
    message.channel.send("If you want your Twitch Channel to be shown here, ping NLHMS#2100.<a:twitch:863441893119885332>");
  }
})
//Welcome
bot.on('guildMemberAdd', member => {
  if(member.guild.id == '813532301521846282'){
  const role = member.guild.roles.cache.find(role => role.id === "846956852033617921");
  member.roles.add(role);
  const welcomeembed= new Discord.MessageEmbed()
    .setColor("#5271ff")
    .setDescription(`Wassuh ${member}, welcome to **🗡N.L No Life🗡**!`)
    .setThumbnail("https://cdn.mee6.xyz/guild-images/813532301521846282/3db1c99151af8cbff41e59614d0052d534eb5d2d8273f66fd6bf85c0e87cbc51.jpeg")
    .setImage("https://cdn.mee6.xyz/guild-images/813532301521846282/fbf2c9cd6557cce329bf28a39eaf4df9e9437fcbbb7b62086dc9004f9e08f895.gif")
    member.guild.channels.cache.get('813538856427192342').send(welcomeembed);
  } 
});
//Leave
bot.on('guildMemberRemove', member => {
  if(member.guild.id == '813532301521846282'){
    member.guild.channels.cache.get('846947148012716042').send(`${member} just lost his virginity and fucked off`);
  } 
});
//Banned Hey Lol
bot.on('guildMemberAdd', member => {
  if(member.guild.id == '816838874549583883'){
    member.ban()
  }
});
//Welcome 
bot.on('guildMemberAdd', member=>{
  if(member.guild.id == '875049238504038400'){
    member.guild.channels.cache.get('875049238504038403').send(`${member} just joined. We should check out the situation. <:suseyes:875058230089371658>`);
  }
})
//Ranking
const leveling = require("./src/ranking");
leveling(bot)
//Per Server Settings Discord Invites Ban
bot.on("guildDelete", guild => {
  bot.settings.delete(guild.id);
});

bot.on("guildMemberAdd", member => {
  bot.settings.ensure(member.guild.id, defaultSettings);
});

bot.on("message", message => {
  const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
  if(message.content.includes("discord.gg/"||"discord.gg/invite")&&guildConf.invites == "on"){
    message.delete()
    message.channel.send("No Promoting Discord Servers Here")
    .then (message=>{
    message.delete({timeout:5000})
    })
  }
})

bot.on("message", async (message) => {
  if(!message.guild || message.author.bot) return;
  // if the key doesn't already exist. 
  const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
  if(message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(PREFIX.length).toLowerCase();
  if(command === "setconf") {
    if (message.member.hasPermission("ADMINISTRATOR")||message.author.id=='821736517012815882'){
    const [prop, ...value] = args;
    if(!bot.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }
    bot.settings.set(message.guild.id, value.join(" "), prop);
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
  }else{
    message.channel.send("You cant use that!")
  }
  }  
  if(command === "showconf") {
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}\n`;
    });
    message.channel.send(`The following are the server's current configuration:
    \`\`\`${configProps}\`\`\``);
  }
});

keepAlive()
bot.login(process.env.TOKEN)