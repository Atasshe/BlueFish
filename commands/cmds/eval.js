const Discord = require("discord.js"),
      { post } = require("node-superfetch");

module.exports = {
  name: "eval",
  description: "",
  usage: "eval <code>",
  timeout: 0,
  aliases: ["e"],
  category: "dono",
  run: async (client, message, args) => {

  if(message.author.id != "Seuid") {
    return;
  }
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name)
  .setThumbnail(message.guild.iconURL({dynamic: true}))
  .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
  .setTimestamp()
  .addField("Entrada", "```js\n" + args.join(" ") + "```");
  
  try {
    const code = args.join(" ");
    if (!code) return message.channel.send("Faltou o codigo!");
    let evaled;
    
    // This method is to prevent someone that you trust, open the secret shit here.
    if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
      evaled = "Cala a boca por que você quer meu token?";
    } else {
      evaled = eval(code);
    }
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      // If the output was more than 1024 characters, we're gonna export them into the hastebin.
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField("Saida", `https://hastebin.com/${body.key}.js`).setColor("#ff1493");
      // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
    } else {
      embed.addField("Saida", "```js\n" + output + "```").setColor("#ff1493")
    }
    
    message.channel.send(embed);
    
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      // Do the same like above if the error output was more than 1024 characters.
      const {body} = await post("https://hastebin.com/documents").send(err);
      embed.addField("Saida", `https://hastebin.com/${body.key}.js`).setColor("#0bbfff");
    } else {
      embed.addField("Saida", "```js\n" + err + "```").setColor("#0bbfff");
    }
    
    message.channel.send(embed);
  }
  }
}

function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}
