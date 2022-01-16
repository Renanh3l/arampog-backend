import { request, Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

interface ResponseUser {
  password?: string;
}

class UserController {
  index(req: Request, res: Response) {
    return res.send({ userId: req.userId });
  }

  async listQueue(re: Request, res: Response) {
    const repository = getRepository(User);

    const users = await repository.find({ where: { inQueue: true } });

    const responseUsers: ResponseUser[] = users;
    responseUsers.forEach((user) => delete user.password);

    return res.json(responseUsers);
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);

    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Unable to create user" });
    }

    const user = repository.create({ email, password });
    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
