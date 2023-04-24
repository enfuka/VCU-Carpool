import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");

  const query =
    'SELECT CONCAT(year," ",model) AS "label", vehicle_ID AS "id" FROM Vehicles';
  // create the connection
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  try {
    const [rows] = await pool.query(query);

    //console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
