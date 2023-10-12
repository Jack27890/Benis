client.on('guildMemberAdd', member => {
client.on('message', 


var role = member.guild.roles.find('name', 'Member'); // Variable to get channel ID
member.addRole(role); // Adds the default role to members

member.guild.channels.get('1160721523099840572').send({embed: {
color: 3447003,
title: "**Formale De Italiano** Welcome Bot!",
url: "WEBSITE URL",
description: "Welcome *" + member + "* to the **Formal De Italiano** discord server! if you have questions or concerns, @ an admin. Fill out and application for riflman!",
fields: [{
    name: "Information",
    value: "Some info on the server"
  }
],
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: "© NAME OF SERVER 2018 - 2019"
}
}}); });