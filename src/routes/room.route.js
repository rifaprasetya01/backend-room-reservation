import express from "express";
import { fetchRoomById, fetchRooms } from "../controllers/room.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const roomRouter = express.Router();

roomRouter.get("/rooms", authenticateToken, fetchRooms);
roomRouter.get("/rooms/:id", authenticateToken, fetchRoomById);

export default roomRouter;
