
module.exports = {
  name: "aprovar",
  run: async (client, message, args) => {
    if(!message.member.roles.cache.has('745342351953625098')){
      return message.reply("Você não é um verificador!")
    }
    let bot = message.mentions.members.first()
    if(!bot) {
      return message.reply("Você precisa mencionar um bot!")
    }
    var db = client.db
    var refe = `BlueF/Bots/${bot.user.id}/Infos`
    let da = db.ref(refe).once("value").then(async function(data) {
    if(data.val() == null) {
      return message.reply("Este bot não é de um membro!")
    }
    let v = data.val().verificador
    if(v != message.author.id) {
      return message.reply("Você não está verificando este bot!")
    }
    let f = data.val().fim
    if(f == "sim") {
      return message.reply("Este bot ja foi verificado!")
    }
    let prefixo = data.val().prefixo
    let lingua = data.val().lingua
    let dono = data.val().dono
    if(lingua == "javascript") {
      bot.roles.add('745339437160071208')
    } else if(lingua == "dbd") {
      bot.roles.add('745344132678942785')
    } else if(lingua == "python") {
      bot.roles.add('745344217680969956')
    } else if(lingua == "outra") {
      bot.roles.add('745361673501540423')
    }
    bot.roles.remove('745756389741428917')
    let d = message.guild.members.cache.get(dono)
    d.roles.add('745339290548043967')
    db.ref(refe).update({
      fim: "sim",
      verificador: "nao"
    })
    message.channel.send(`O bot \`${bot.user.username}\` foi aprovado com sucesso!`)
    let bl = client.channels.cache.get('745387874324840539')
    let n = data.val().nota
    let txt;
    if(n == "nao") n = null
   if(!n) {
     txt = `<:yep:746416690895650826> | O bot \`${bot.user.username}\` de ${d} foi aprovado!`
  } else {
      txt = `<:yep:746416690895650826> | O bot \`${bot.user.username}\` de ${d} foi aprovado!\nNota: \`${n}\``
  }
    bl.send(txt)
    bot.setNickname(`( ${prefixo} )${bot.user.username}`)
    })
  }
}