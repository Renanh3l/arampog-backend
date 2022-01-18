import { getRepository } from "typeorm";
import { User as DiscordUserType, Message, EmbedAuthorData, MessageEmbed } from "discord.js";
import User from "../../app/models/User";

const Registro = async (
  message: Message,
  discordUser: DiscordUserType,
  botAuthorData: EmbedAuthorData
) => {
  try {
    const registered = await tryRegisterUser(discordUser);

    if (!registered) {
      return message.reply("Ocorreu algum erro no registro!");
    }

    const embed = new MessageEmbed()
      .setTitle("Seja bem vindo!")
      .setAuthor(botAuthorData)
      .setColor("#04c4fb")
      .setDescription(
        `
                Você foi registrado no sistema!
                Utilize --queue para entrar na fila!`
      )
      .setImage("http://www.sjgames.com/pyramid/gifbin/p13/iceage_title.jpg")
      .setThumbnail("https://i.imgur.com/AIpFNAY.jpeg");

    message.channel.send({ embeds: [embed] });
  } catch ({ err }) {
    return message.reply("Você já possui registro!");
  }
};

export const tryRegisterUser = async (user: DiscordUserType) => {
  const repository = getRepository(User);

  const { id, username } = user;

  const userExists = await repository.findOne({ where: { id } });

  if (userExists) {
    throw new Error();
  }

  const newUser = repository.create({ id, nickname: username });
  await repository.save(newUser);

  return true;
};

export default Registro;
