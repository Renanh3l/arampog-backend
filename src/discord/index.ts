import config from "../utils/discordConfig";
import {
  Client,
  Intents,
  EmbedAuthorData,
  Message,
  MessageEmbed,
  Snowflake,
} from "discord.js";
import { listQueue } from "./commands/ListQueue";
import Queue from "./commands/Queue";
import Registro from "./commands/Registro";
import discordConfig from "../utils/discordConfig";

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

export const sendEmbedMessage = async (
  messageToSend: string | MessageEmbed,
  channelId: string
): Promise<Snowflake> => {
  const { messages }: any = await client.channels.fetch(`${channelId}`);

  const { id } = await messages?.channel?.send({ embeds: [messageToSend] });
  console.log(id, "id");
  return id;
};

export const requestMatchApproval = async (
  redTeam: any[],
  blueTeam: any[],
  cb: () => void
) => {
  const matchMembers = [...redTeam, ...blueTeam];

  let matchApproved = false;

  const embed = new MessageEmbed()
    .setTitle("Partida encontrada!")
    .setAuthor(botAuthorData)
    .setColor("#04c4fb")
    .setDescription(
      `
                Time azul:
                ${blueTeam.map((user) => `${user.nickname}`)}
                --------------------------------------------
                Time vermelho:
                ${redTeam.map((user) => `${user.nickname}`)}

                Confirme essa mensagem para declarar pronto! 
        `
    )
    .setThumbnail("https://i.imgur.com/AIpFNAY.jpeg");

  const matchMessageId = await sendEmbedMessage(
    embed,
    discordConfig.matchFoundChannelId
  );

  setTimeout(() => (matchApproved = false), 10000);
  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

  do {
    // Get Reactions
    // GET/channels/{channel.id}/messages/{message.id}/reactions/{emoji}

    try {
      const reactions = await client.channels.fetch(
        `${discordConfig.matchFoundChannelId}/messages/${matchMessageId}/reactions/✅`
      );

      console.log(reactions);

      await timer(3000);
    } catch {
        
    }
  } while (!matchApproved);

  cb();
};

client.on("messageCreate", async (message: Message) => {
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
