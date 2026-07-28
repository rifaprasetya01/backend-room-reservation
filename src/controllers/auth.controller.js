import { createUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      const error = new Error("Nama dan email wajib diisi.");
      error.statusCode = 400;
      throw error;
    }

    const response = await createUser(name, email);

    const io = req.app.get("io");
    if (io) {
      io.emit("user_created", response.user);
    }

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil!",
      data: response,
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
