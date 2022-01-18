import config from "../utils/discordConfig";
import { Client, Intents, EmbedAuthorData } from "discord.js";
import { listQueue } from "./commands/ListQueue";
import Queue from "./commands/Queue";
import Registro from "./commands/Registro";

const botAuthorData: EmbedAuthorData = {
  name: "POG Aram",
  iconURL:
    "https://img2.gratispng.com/20180427/pow/kisspng-logo-ice-5ae315cb9e4a86.1562751615248316916484.jpg",
};

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`💬 Logado no Discord como ${client?.user?.tag}!`);
});

client.on("messageCreate", async (message) => {
  let { content } = message;

  if (!content.startsWith(config.prefix)) return;

  const args = content.replace(config.prefix, "").split(" ");
  const command = args[0];
  const discordUser = message.author;
  const userId = discordUser.id;

  switch (command) {
    case "listqueue":
      const queue = await listQueue();

      message.reply(JSON.stringify(queue));
      break;

    case "registro":
      await Registro(message, discordUser, botAuthorData);
      break;

    case "queue":
      await Queue(message, userId);
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
