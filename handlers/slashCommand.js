const fs = require('fs');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Stats').setBorder('|', '=', "0", "0")

const TOKEN = 'MTE0ODgzNDk1MzE2MTg2NzI2NA.G-oIVS.NdcYBu2vMpftcxnHuqvkFTy8vvoimqQ_GIXk1o';
const CLIENT_ID = '1148834953161867264';

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
  const slashCommands = [];

  fs.readdirSync('./slashCommands/').forEach(async dir => {
    const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const slashCommand = require(`../slashCommands/${dir}/${file}`);
      slashCommands.push({
        name: slashCommand.name,
        description: slashCommand.description,
        type: slashCommand.type,
        options: slashCommand.options ? slashCommand.options : null,
        default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
        default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
      });

      if (slashCommand.name) {
        client.slashCommands.set(slashCommand.name, slashCommand)
        table.addRow(file.split('.js')[0], '✅')
      } else {
        table.addRow(file.split('.js')[0], '⛔')
      }
    }

  });
  (async () => {
    try {
      await rest.put(
        process.env.GUILD_ID ?
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID) :
          Routes.applicationCommands(CLIENT_ID),
        { body: slashCommands }
      );
      console.log('Slash Commands • Registered')
    } catch (error) {
      console.log(error);
    }
  })();
};
