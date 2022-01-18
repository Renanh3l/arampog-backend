import User from "./app/models/User";
import { getRepository } from "typeorm";
import { shuffleArray } from "./utils";
import { requestMatchApproval } from "./discord";
import discordConfig from "./utils/discordConfig";

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

  if (queue.length >= 2) {
    // TODO: 2 only for dev purposes - Change to 10 players match

    const matchMembers = queue.slice(0, 2);
    const teams = shuffleArray(matchMembers);

    const redTeam = teams.slice(0, 1);
    const blueTeam = teams.slice(1, 2);

    // Matchfound: TODO: Wait users to accept queue
    // sendMessage("Partida encontrada!", discordConfig.matchFoundChannelId);

    // Remove users from queue
    matchMembers.forEach(async (member) => {
      member.inQueue = false;
      await repository.save(member);
    });

    requestMatchApproval(redTeam, blueTeam, () => {
      // Create match
      matches.push({
        select: true,
        running: false,
        redTeam,
        blueTeam,
      });
    });
  } else {
    console.log(
      `⌚ Sem usuários suficientes (${queue.length}) [Aram Inhouse Pog]`
    );
  }
}

setInterval(checkQueue, 2000);
