
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
    var refe = `BotList/Bots/${bot.user.id}/Infos`
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

    //Aqui é pra ele separar o bot pela linguagem para ser só 1 cargo coloque o mesmo id em todos os ifs
    let prefixo = data.val().prefixo
    let lingua = data.val().lingua
    let dono = data.val().dono
    if(lingua == "javascript") {
      bot.roles.add('id do cargo de javascript')
    } else if(lingua == "dbd") {
      bot.roles.add('id do cargo de dbd')
    } else if(lingua == "python") {
      bot.roles.add('id do cargo de python')
    } else if(lingua == "outra") {
      bot.roles.add('id do cargo de outra linguagem')
    }
    bot.roles.remove('745756389741428917')
    let d = message.guild.members.cache.get(dono)
    d.roles.add('745339290548043967')
    db.ref(refe).update({
      fim: "sim",
      verificador: "nao"
    })
    message.channel.send(`O bot \`${bot.user.username}\` foi aprovado com sucesso!`)
    let bl = client.channels.cache.get('id do canal de logs')
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
