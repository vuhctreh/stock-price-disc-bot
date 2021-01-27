const discord = require("discord.js");
const api = require("./helpers/apicall");
const embed = require("./helpers/embedgen");

const client = new discord.Client();

const prefix = ".stock ";

client.once("ready", () => {
  console.log("The bot is ready for usage!");
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const searchParameter = message.content.slice(prefix.length).toLowerCase();
  const bruh = await api.getInfo(searchParameter);

  if (bruh == null) message.channel.send("There was an error with the bot!");
  else message.channel.send(embed.genEmbed(bruh));
});

client.login(process.env.TOKEN);
