import {
  checkUserLogin,
  createUser,
  loginUser,
} from "../services/auth.service.js";

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

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email wajib diisi.");
      error.statusCode = 400;
      throw error;
    }

    const response = await loginUser(email);

    res.status(200).json({
      success: true,
      message: "Login berhasil!",
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

export const checkSession = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      const error = new Error("Id tidak ditemukan.");
      error.statusCode = 400;
      throw error;
    }

    const response = await checkUserLogin(id);

    res.status(200).json({
      success: true,
      message: "Pengguna ditemukan",
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
