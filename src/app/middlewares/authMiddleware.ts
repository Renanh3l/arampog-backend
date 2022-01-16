import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY ?? "secret_key_pog_aram"
    );

    const { id } = data;

    req.userId = id;
    
    return next();
  } catch {
    return res.sendStatus(401);
  }
}
