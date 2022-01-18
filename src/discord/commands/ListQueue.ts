import { getRepository } from "typeorm";
import User from "../../app/models/User";

export const listQueue = async () => {
  const repository = getRepository(User);

  const users = await repository.find({ where: { inQueue: true } });

  return users;
};
