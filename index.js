const express = require('express');
require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType, Partials, Collection } = require('discord.js');

const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env['openAiKey'],
});


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

const fs = require('fs');
const config = require('./config.json');
const dotenv = require('dotenv').config()

client.commands = new Collection();
client.aliases = new Collection()
client.events = new Collection();
client.slashCommands = new Collection();
module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const { Server } = require("socket.io")
const http = require('http')
const server = http.createServer(app)
const io = new Server(server)

var request = require('request').defaults({ encoding: null });

app.use(express.static(__dirname + '/front'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


let online = false;

app.get('/', (req, res) => {
  res.send('Online');
});

async function getMembers() {
  await guild.members.fetch();
}

app.get('/membercount', (req, res) => {
  getMembers().then(()=>{
    res.json({members: guild.members.cache.filter(member => !member.user.bot).size});
  })
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + "/front/dashboard/index.html")
});

app.get('/wakeup', (req, res) => {
  res.send('fine fine ill wake up');
});


async function fetchChannel(id) {
  await client.channels.fetch(id);
}

async function fetchDM(id) {
  await client.users.fetch(id);
}

let guild;

async function main() {

  new Promise((resolve) => {
    client.login('MTE0ODgzNDk1MzE2MTg2NzI2NA.G-oIVS.NdcYBu2vMpftcxnHuqvkFTy8vvoimqQ_GIXk1o');

    client.on('ready', async () => {
      console.log(`Logged in as ${client.user.tag}!`);
      await client.channels.fetch('1148837664326426685');
      console.log('Fetched channels!');
      client.user.setPresence({
        activities: [{ name: `GO FUCK YOURSELF`, type: ActivityType.Custom }],
        status: 'online'
      });

      const pingCommand = {
        name: "ping",
        description: "Test the client's responsiveness with a simple ping command"
      };

      guild = client.guilds.cache.get("1086532443416301660");
      await guild.commands.create(pingCommand);

      console.log('Commands loaded!')
      console.log('Bot loaded!')

      resolve();
    });
  });

  server.listen(process.env.PORT, () => {
    online = true;
  });

  io.on('connection', (socket) => {

    socket.on('message', (msg) => {
      if (msg.password == "ChocolateP0litics4") {

        if (msg.type = "DM") {

          fetchDM(msg.id).then(() => {
            client.users.cache.get(msg.id).send(msg.message).catch(console.log);
          })

        } else {

          fetchChannel(msg.id).then(() => {
            client.channels.cache.get(msg.id).send(msg.message).catch(console.log);
          })


        }
      }

    });

    socket.on("disconnect", (reason) => {
    });
  })

}

main();

client.on('messageCreate', async (message) => {
  if (message.author.client) return;
  if (message.content.startsWith('?')) {
    const prompt = message.content.slice(1);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
    });
    message.channel.send(completion.data.choices[0].text);
  }
})