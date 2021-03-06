import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface ResponseUser {
  password?: string;
}

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);

    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY ?? "secret_key_pog_aram",
      { expiresIn: "1d" }
    );

    const responseUser: ResponseUser = user;

    delete responseUser.password;

    return res.json({
      user: responseUser,
      token,
    });
  }
}

export default new AuthController();
