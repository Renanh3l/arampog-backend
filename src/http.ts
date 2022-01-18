import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import "./database/connect";
import routes from "./routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);


export { app };
