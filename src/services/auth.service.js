import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const getUserByEmail = async (email) => {
  const [users] = await pool.query(
    "SELECT * from users where email = ?",
    [email],
  );

  return users[0] || null;
};

export const createUser = async (name, email) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    const error = new Error("Email sudah terdaftar.");
    error.statusCode = 400;
    throw error;
  }

  const [response] = await pool.query(
    "insert into users (name, email) values (?, ?)",
    [name, email],
  );

  const newUser = {
    id: response.insertId,
    name: name,
    email: email,
    created_at: new Date(),
  };

  const token = jwt.sign(
    { id: newUser.id, name: newUser.name, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { user: newUser, token: token };
};

export const loginUser = async (email) => {
  const user = await getUserByEmail(email);

  if (!user) {
    const error = new Error("Email salah");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { user, token };
};
