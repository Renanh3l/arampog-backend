import { serverHttp } from "./http";
import "./websocket";

serverHttp.listen(3000, () => {
  console.log(`🔥 Servidor iniciado em http://localhost:3000`);
});
