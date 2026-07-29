import { getAllRooms, getRoomById } from "../services/room.service.js";

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

export const fetchRoomById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      const error = new Error("Id tidak ditemukan.");
      error.statusCode = 400;
      throw error;
    }

    const room = await getRoomById(id);

    if (!room) {
      const error = new Error("Room tidak ditemukan.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "",
      data: room,
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
