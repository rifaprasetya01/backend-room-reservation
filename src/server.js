import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

dotenv.config({ path: ".env.dev" });

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("PONG!");
});

io.on("connection", (socket) => {
  console.log(`[Socket] Client terhubung: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`[Socket] Client terputus: ${socket.id}`);
  });
});

const PORT = process.env.APP_PORT || 5557;
server.listen(PORT, () => {
  console.log(`[Server] berjalan di http://localhost:${PORT}`);
});
