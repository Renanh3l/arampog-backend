import { app } from "./http";
import "./queue";
import "./discord";

app.listen(3000, () => {
  console.log(`🔥 Servidor iniciado em http://localhost:3000`);
});