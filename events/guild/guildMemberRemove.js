
module.exports = (client, member) => {
  var db = client.db
  let b = db.ref(`BotList)Donos/${member.user.id}/Bot`).once("value").then(async function(snap) {
  if(snap.val() != null) {
    let bo = member.guild.members.cache.get(snap.val().bot)
    bo.kick('Dono saiu do servidor')
    db.ref(`BotList/Bots/${snap.val().bot}/Infos`).set(null)
client.channels.cache.get('id do canal de logs').send(`<:mai1:746470586032849007> | O bot \`${bo.user.username}\` foi expulso automáticamente pelo motivo: \`Dono saiu do servidor\``)

  }
  })
}
