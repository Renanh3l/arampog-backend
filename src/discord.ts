import config from "./utils/discordConfig";
import { Client, Intents } from "discord.js";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`💬 Logado no Discord como ${client?.user?.tag}!`);
});

client.on("messageCreate", (message) => {
  let { content } = message;

  if (!content.startsWith(config.prefix)) return;

  const args = content.replace(config.prefix, "").split(" ");
  const command = args[0];

  switch (command) {
    case "listqueue":
      message.reply("Oie!");
      break;

    default:
      break;
  }
});

client.login(process.env.BOT_TOKEN).then(() => {
  client?.user?.setPresence({
    activities: [{ name: "ARAM Inhouse", type: "PLAYING" }],
    status: "online",
  });
});
