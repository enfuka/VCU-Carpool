import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");

  const query =
    "SELECT vehicle_ID, license_plate, make, model, year, color, (SELECT CONCAT(first_name, ' ', last_name) FROM Users WHERE user_ID=owner) AS 'owner' FROM Vehicles";

  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    rowsAsArray: true,
  });

  try {
    const [rows] = await connection.query(query);
    connection.end();
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
