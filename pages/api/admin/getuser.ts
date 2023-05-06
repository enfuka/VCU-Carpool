import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");
  const { id } = req.body;

  const query =
    "SELECT user_ID, first_name, last_name, email, gender, phone, (SELECT COUNT(user_ID) FROM Admins WHERE user_ID=u.user_ID) AS isAdmin FROM Users u WHERE user_ID=?";

  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  try {
    const [rows] = await connection.query(query, [id]);
    connection.end();
    //console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
