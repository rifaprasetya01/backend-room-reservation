import { getAllRooms } from "../services/room.service.js";

export const fetchRooms = async (req, res) => {
  try {
    const rooms = await getAllRooms();

    res.status(200).json({
      success: true,
      message: "",
      data: rooms,
    });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
