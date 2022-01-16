import { io } from "./http";
import authMiddlewareIO from "./app/middlewares/io/authMiddlewareIO";
import User from "./app/models/User";
import { getRepository } from "typeorm";
import { shuffleArray } from "./utils";

io.use(authMiddlewareIO);

interface Match {
  select: boolean;
  running: boolean;
  redTeam: any[];
  blueTeam: any[];
}

const matches: Match[] = [];

async function checkQueue() {
  console.log(`⌚ Checando fila... [Aram Inhouse Pog]`);
  const repository = getRepository(User);
  const queue = await repository.find({ where: { inQueue: true } });

  // TODO: handle matchmaking queues based on MMR

  if (queue.length >= 10) {
    const matchMembers = queue.slice(0, 10);
    const teams = shuffleArray(matchMembers);

    const redTeam = teams.slice(0, 5);
    const blueTeam = teams.slice(5, 10);

    // Remove users from queue
    matchMembers.forEach(async (member) => {
      member.inQueue = false;
      await repository.save(member);
    });

    // Create match
    matches.push({
      select: true,
      running: false,
      redTeam,
      blueTeam,
    });
  } else {
    console.log(
      `⌚ Sem usuários suficientes (${queue.length}) [Aram Inhouse Pog]`
    );
  }
}

setInterval(checkQueue, 2000);

io.on("connection", (socket) => {
  console.log("Connected: " + socket.data.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.data.userId);
  });

  // socket.on("chatroomMessage", async ({ chatroomId, message }) => {
  //   if (message.trim().length > 0) {
  //     const user = await User.findOne({ _id: socket.userId });
  //     const newMessage = new Message({
  //       chatroom: chatroomId,
  //       user: socket.userId,
  //       message,
  //     });
  //     io.to(chatroomId).emit("newMessage", {
  //       message,
  //       name: user.name,
  //       userId: socket.userId,
  //     });
  //     await newMessage.save();
  //   }
  // });
});
