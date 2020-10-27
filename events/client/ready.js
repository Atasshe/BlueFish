module.exports = (client) => {
  let b = client.users.cache.filter(b => b.bot).size
  client.user.setActivity(`Monitorando ${b} bots`, {type: 'WATCHING'})
  
  
}