
module.exports = {
  name: "reprovar",
  run: async (client, message, args) => {
    if(!message.member.roles.cache.has('745342351953625098')) {
      return message.reply("Você não é um verificador!")
    }
    let bot = message.mentions.members.first()
    if(!bot) {
      return message.reply("Você precisa mencionar algum bot!")
    }
    var refe = `BlueF/Bots/${bot.user.id}/Infos`
    var db = client.db
    let data = db.ref(refe).once("value").then(async function(snap) {
    if(snap.val() == null) {
      return message.reply("Este não é um bot debum membro!")
    }
    let v = snap.val().verificador
   if(v != message.author.id) {
     return message.reply("Você não está verificando este bot!")
   }
    let f = snap.val().fim
    if(f == "sim") {
      return message.reply("Este bot ja foi verificado!")
    }
    let mot = args.slice(1).join(" ")
    if(!mot) {
      return message.reply("Você não especificou o motivo, ex: .reprovar @bot bot feio")
    }
    let dono = snap.val().dono
    let nome = snap.val().nome
    db.ref(`BlueF/Donos/${dono}/Bot`).set(null)
    db.ref(refe).set(null)
client.channels.cache.get('745387874324840539')
    .send(`<:non:746416709862424687> | O bot \`${bot.user.username}\` de <@${dono}> foi reprovado pelo motivo: \`${mot}\``)
    bot.kick('Bot reprovado')
    message.reply(`O bot \`${bot.user.username}\` foi reprovado com sucesso pelo motivo: \`${mot}\``)
    })
  }
}