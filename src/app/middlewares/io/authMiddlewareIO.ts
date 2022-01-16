import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export default async function authMiddlewareIO(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const { token } = socket.handshake.auth;

  if (!token) {
    return next(new Error("Not Authorized"));
  }

  try {
    const data = jwt.verify(
      token.replace("Bearer", "").trim(),
      process.env.JWT_SECRET_KEY ?? "secret_key_pog_aram"
    );

    const { id } = data;

    socket.data.userId = id;

    return next();
  } catch {
    return next(new Error("Invalid authentication token"));
  }
}
