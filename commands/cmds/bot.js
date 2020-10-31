
const Discord = require("discord.js")
module.exports = {
  name: 'bot',
  run: async (client, message, args) => {
    let bot = message.mentions.members.first()
    if(!bot) {
      return message.reply("Você precisa mencionar um bot!")
    }
    var db = client.db
    var refe = `BotList/Bots/${bot.user.id}/Infos`
    let data = db.ref(refe).once("value").then(async function(data) {
    if(data.val() == null) {
      return message.reply("Este bot não esta registrado na minha database")
    }
    let dono = data.val().dono
    let ling = data.val().lingua
    let prefixo = data.val().prefixo
    let votos = data.val().votos
    if(votos == null) votos = 0
    const embed = new Discord.MessageEmbed()
    .setAuthor(bot.user.username, client.user.displayAvatarURL())
    .setColor("blue")
    .setThumbnail(bot.user.displayAvatarURL())
    .addField("Nome", bot.user.username, false)
    .addField("Dono", `<@${dono}>/\`${dono}\``, false)
    .addField("Prefixo", prefixo, false)
    .addField("Linguagem", ling, false)
    .addField("Votos", votos)
    message.channel.send(embed)
    })
  }
}
