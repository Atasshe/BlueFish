
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "verificar",
  run: async (client, message, args) => {
    if(!message.member.roles.cache.has('id do cargo de verificador')){
      return message.reply("Você não é um verificador!")
    }
    let bot = message.mentions.members.first()
    if(!bot) {
      return message.reply("Você precisa mencionar o bot não verificado!")
    }
    if(!bot.user.bot) {
      return message.reply("Ele não é um bot -_-")
    }
    var db = client.db
    var refe = `BotList/Bots/${bot.user.id}/Infos`
    let datab = db.ref(refe).once("value").then(async function(data) {
    if(data.val() == null) {
      return message.reply("Este bot não é de um membro")
    }
    
    let f = data.val().fim
    if(f == "sim") {
      return message.reply("Este bot ja foi verificado!")
    }
    let ve = data.val().verificado
    if(ve == "sim") {
      return message.reply(`Este bot ja está sendo verificado pelo <@${data.val().verificador}>`)
    }
    let nome = data.val().nome
    let prefixo = data.val().prefixo
    let lingua = data.val().lingua
    let dono = data.val().dono
    let bl = client.channels.cache.get('id do canal de logs')
    bl.send(`🔍 | O bot \`${bot.user.username}\` de <@${dono}> está sendo verificado pelo(a) ${message.author}`)
    message.channel.send(`Você está verificando o bot \`${bot.user.username}\`!`)
    db.ref(refe).update({
      verificado: "sim",
      verificador: message.author.id
    })
    
   
   let soli = client.channels.cache.get('745390110249582732')
 client.channels.cache.get('745390232114823168').send(`O bot \`${nome}\` foi verificado pelo \`${message.author.tag}\``)
  
    })
  }
}
