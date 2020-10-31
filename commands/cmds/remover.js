const db = require("quick.db")
const Discord = require("discord.js")
module.exports = {
  name: "remover",
  run: async (client, message, args) => {
    
    let bot = message.mentions.members.first()
    if(!bot) {
      return message.reply("Você precisa mencionar um bot")
    }
    var db = client.db
    var refe1 = `BotList/Bots/${bot.user.id}/Infos`
    var refe2 = `BotList/Donos/${message.author.id}/Bot`
    db.ref(refe1).once("value").then(async function(snap){
    var db2 = await db.ref(refe2).once("value")
    let b = db2.val().bot
    if(b != bot.user.id && !message.member.roles.cache.has('745339972155998278')) {
      return message.reply("Este bot não é seu!")
    }
    
    if(snap.val() == null) {
      return message.reply("Este bot não é de um membro.")
    }
    let dono = snap.val().dono
    message.reply(`Você realmente deseja remover seu bot aqui do servidor?`).then(msg => {
      msg.react("✅")
      msg.react("❌")
      let filtro = (react, user) => react.emoji.name === "✅" && user.id === message.author.id
      let coletor = msg.createReactionCollector(filtro, {max: 1, time: 120000}).on('collect', s => {
        msg.delete
        db.ref(refe1).set(null)
        db.ref(refe2).set(null)
        let m = message.guild.members.cache.get(dono)
        m.roles.remove('745339290548043967')
        bot.kick('Bot removido')
      let ch = client.channels.cache.get('745387874324840539')
      ch.send(`<:mai1:746470586032849007> | O bot \`${bot.user.username}\` de <@${dono}> foi removido pelo(a) ${message.author}`)
        message.reply(`O bot \`${bot.user.username}\` foi removido com sucesso`)
      })
      let filtro2 = (react, user) => react.emoji.name === "❌" && user.id === message.author.id
      let coletor2 = msg.createReactionCollector(filtro2, {max:1, time: 120000}).on('collect', n => {
        message.reply("Operação cancelada!")
        msg.delete()
      })
      })
    })
  }
}
