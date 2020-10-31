
module.exports = {
  name: "nota",
  run: async (client, message, args) => {
    if(!message.member.roles.cache.has('745342351953625098')) {
      return message.reply("Você não é um verificador!")
    }
    let bot = message.mentions.members.first()
    if(!bot) {
      return message.reply("Você precisa mencionar um bot!")
    }
    var refe = `BotList/Bots/${bot.id}/Infos`
    var db = client.db
    let data = db.ref(refe).once("value").then(async function(snap) {
    if(snap.val() == null) {
      return message.reply("Este bot não é de um membro!")
    }
    let ve = snap.val().verificado
    if(ve == "nao") {
      return message.reply("Este bot não está sendo verificado")
    }
    if(snap.val().verificador != message.author.id) {
      return message.reply("Este bot não está sendo verificado por você!")
    }
    let nota = args.slice(1).join(" ")
    if(!nota) {
      return message.reply("Você precisa escrever a nota após o comando! ex: \`.nota @bot Este bot é muito bom!")
      
    }
    db.ref(refe).update({
      nota: nota
    })
    message.reply("Nota adicionada com sucesso!")
    })
  }
}
