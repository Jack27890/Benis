const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const token = 'YOUR_BOT_TOKEN';
const prefix = '!'; // Customize the command prefix

// An array to store reminders
const reminders = [];

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore messages from other bots

  if (message.content.startsWith(`${prefix}remind`)) {
    // Parse the user's message to extract the time and reminder text
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const time = args[1];
    const reminder = args.slice(2).join(' ');

    // Add the reminder to the array
    reminders.push({ user: message.author.id, time, reminder });

    // Send a confirmation message
    message.reply(`I will remind you at ${time} about: "${reminder}"`);

    // Schedule the reminder
    scheduleReminder(time, message.author);
  }
});

function scheduleReminder(time, user) {
  // Parse the time string (you may need to implement a more robust parser)
  const [hours, minutes] = time.split(':').map(Number);

  // Calculate the time until the reminder in milliseconds
  const now = new Date();
  const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  const delay = reminderTime - 
