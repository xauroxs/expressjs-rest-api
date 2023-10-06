import http from "http";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = 8080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const MONGO_URL = `mongodb+srv://${username}:${password}@${cluster}.t5n5lr1.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

mongoose.Promise = Promise;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.log(error));

app.use("/", router());
