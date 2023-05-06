import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { first_name, last_name, gender, phone, admin, user_ID, isAdmin } =
    req.body;

  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  const query =
    "UPDATE `Users` SET first_name=?, last_name=?, gender=?, phone=? WHERE user_ID=?";
  const values = [first_name, last_name, gender, phone, user_ID];

  const [result] = await connection.execute(query, values);

  // Admin toggle
  if (admin == "0" && isAdmin == 1) {
    await connection.execute("DELETE FROM Admins WHERE user_ID=?;", [user_ID]);
  } else if (admin == "1" && isAdmin == 0) {
    await connection.execute("INSERT INTO Admins (user_ID) VALUES(?);", [
      user_ID,
    ]);
  }
  connection.end();
  res.status(200).json(result);
}
