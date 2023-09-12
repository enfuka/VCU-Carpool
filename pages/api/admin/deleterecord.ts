import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");

  const { idsToDelete, type } = req.body;
  var query = "";

  switch (type) {
    case "user":
      query = "DELETE FROM Users WHERE user_ID IN (?)";
      break;
    case "ride":
      query = "DELETE FROM Rides WHERE ride_ID IN (?)";
      break;
    case "vehicle":
      query = "DELETE FROM Vehicles WHERE vehicle_ID IN (?)";
      break;
  }

  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  try {
    const [rows] = await connection.query(query, [idsToDelete]);
    connection.end();
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
    console.log(error);
  }
}
