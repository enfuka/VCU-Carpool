import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { first_name, last_name, gender, phone, admin, user_ID, isAdmin } =
    req.body;

  const mysql = require("mysql2/promise");
  // create the connection
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  const query =
    "UPDATE `Users` SET first_name=?, last_name=?, gender=?, phone=? WHERE user_ID=?";
  const values = [first_name, last_name, gender, phone, user_ID];

  const [result] = await pool.execute(query, values);

  // Admin toggle
  if (admin == "0" && isAdmin == 1) {
    await pool.execute("DELETE FROM Admins WHERE user_ID=?;", [user_ID]);
  } else if (admin == "1" && isAdmin == 0) {
    await pool.execute("INSERT INTO Admins (user_ID) VALUES(?);", [user_ID]);
  }

  res.status(200).json(result);
}
