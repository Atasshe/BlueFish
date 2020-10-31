module.exports = {
  name: "rank",
  timeout: 10,
  run: async(client, message, args) => {
    var db = client.db
    var p = []
    message.guild.members.cache.filter(n => n.user.bot).forEach(user => {
      p.push(user)
    })
    var all = p.length
    var peo = 0
    var peoToShow = 10
    var mes = []
    for(let i=0;i<all;i++) {
     var d = await db.ref(`BotList/Bots/${p[i].user.id}/Infos`).once("value")
     if(d.val()){
     mes.push({
       name: p[i].user.username,
      id: p[i].user.id,
       amount: d.val().votos
     })
       
     }
    }
    var realArr = []
    mes.sort((a, b) => b.amount - a.amount)
    for(let k=0;k < 10;k++) {
     var em = ""
     if(k == 0) {
       em = "<:primeiro_lugar:753013513856876554>"
     } else if(k == 1) {
       em = "<:segundo_lugar:753014585359073381>"
     } else if(k == 2) {
       em = "<:terceiro_lugar:753024654918025256>"
     } else {
       em = k + 1
     }
      
      realArr.push(`**${em} - ${mes[k].name}** » **${mes[k].amount}** votos`)
    }
    var fim = realArr.join("\n")
    message.channel.send(fim)
  }
}
