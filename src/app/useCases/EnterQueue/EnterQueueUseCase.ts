import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import User from "../../models/User";

interface ResponseUser {
  password?: string;
}

class EnterQueueUseCase {
  async execute(req: Request, res: Response) {
    const repository = getRepository(User);

    const { userId } = req;

    const user = await repository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    user.inQueue = !user.inQueue;
    await repository.save(user);

    const responseUser: ResponseUser = user;
    delete responseUser.password;

    return res.json(responseUser);
  }
}

export default new EnterQueueUseCase();
