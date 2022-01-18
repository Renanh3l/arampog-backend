import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

class UserController {
  index(req: Request, res: Response) {
    return res.send({ userId: req.userId });
  }

  async listQueue(re: Request, res: Response) {
    const repository = getRepository(User);

    const users = await repository.find({ where: { inQueue: true } });

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);

    const { id, username } = req.body;

    const userExists = await repository.findOne({ where: { id } });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (!id || !username) {
      return res.status(400).json({ message: "Unable to create user" });
    }

    const user = repository.create({ id, nickname: username });
    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
