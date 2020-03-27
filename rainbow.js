

const Discord = require('discord.js');
const config = require('./config.json');
const disco = new Discord.Client();
const prefix = config.prefix;
const allowedUsers = config.allowedUsers;
const roles = config.roleToDisco;

disco.on("ready", () => {
    disco.user.setPresence({ game: { name: `🌈 | 𝐍𝐀𝐒𝐀 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟗.𝟎` }, type: 0 });
    console.log("🌈 | 𝐍𝐀𝐒𝐀 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟗.𝟎");
});

disco.on("message", message =>{
  if(message.content === prefix + "servername"){
      if(message.channel.type === "dm" || message.channel.type === "group") return;
      else if(!message.guild.member(disco.user).hasPermission("MANAGE_GUILD") || !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(":x: **Vous ou le bot manquez de perm (Permission requise : ** `MANAGE_GUILD`").catch(e => {});
      else setInterval(function () {message.guild.setName("input the first server name"); message.guild.setName("input the second")}, 2000)

  }
})

disco.on("message", message => {

  function discoRole() {
    let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    roles.forEach((role) => {
      let theRole = message.guild.roles.find("name", role);
      theRole.edit({color: random}).catch(e => {
        return message.channel.send(":x: **Error:** The role you specified in the `config.json` is either not a role on this server, or his a role higher than the highest role that I have.");
      });
    });
  }

  if(message.content.startsWith(prefix + "start")) {
    if(allowedUsers.includes(message.author.id)) {
    setInterval(() => { discoRole(); }, config.ms);
    message.channel.send("```css\nDiscoing...```");
    message.channel.send("Please make sure you know how to use.");
  } else {
    message.reply(`You do not have permission to discord.`);
  }
} else

if(message.content.startsWith(prefix + "stop")) {
  if(allowedUsers.includes(message.author.id)) {
  message.channel.send("I've stopped discoing.");
  setTimeout(() => { console.log(process.exit(0)); }, 300);
} else {
  message.reply(`You do not have permission to disco.`);
  }
}

});

disco.login(config.token);
