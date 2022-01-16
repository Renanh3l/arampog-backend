import { createConnection } from "typeorm";

createConnection().then(() =>
  console.log(`📦 Conectado com sucesso à database!`)
);
