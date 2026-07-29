import express from "express";
import { fetchRooms } from "../controllers/room.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const roomRouter = express.Router();

roomRouter.get("/rooms", authenticateToken, fetchRooms);

export default roomRouter;
