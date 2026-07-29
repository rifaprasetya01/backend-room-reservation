import pool from "../config/db.js";

export const getAllRooms = async () => {
  const [rooms] = await pool.query(
    "select id, name, capacity, status from rooms order by id asc",
  );

  return rooms;
};
