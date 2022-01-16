import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import "./database/connect";
import routes from "./routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

export { serverHttp, io };
