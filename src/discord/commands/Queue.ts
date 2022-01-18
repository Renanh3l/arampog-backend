import { Message } from "discord.js";
import { getRepository } from "typeorm";
import User from "../../app/models/User";

const Queue = async (message: Message, userId: string) => {
  try {
    const entered = await tryEnterQueue(userId);

    if (entered) {
      return message.reply("Você entrou na fila!");
    }

    return message.reply("Você saiu da fila!");
  } catch {
    return message.reply("Usuário sem registro! Use: --registro");
  }
};

export const tryEnterQueue = async (userId: string): Promise<boolean> => {
  const repository = getRepository(User);

  const user = await repository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error();
  }

  user.inQueue = !user.inQueue;
  await repository.save(user);

  return user.inQueue;
};

export default Queue;
