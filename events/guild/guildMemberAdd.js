module.exports = (client, member) => {
  if(!member.user.bot) {
    member.roles.add('746084449179009464')
  } else if(member.user.bot){
    member.roles.add('745756389741428917')
  }
}