import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const email = session?.email;

  const mysql = require("mysql2/promise");

  const { vehicle_ID, license_plate, make, model, year, color } = req.body;

  const query =
    "INSERT INTO Vehicles(license_plate, make, model, year, color, owner) VALUES(?,?,?,?,?,(SELECT user_ID FROM Users WHERE email=?));";

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  const values = [license_plate, make, model, year, color, email];

  try {
    console.log(req.body);
    const [rows] = await connection.query(query, values);
    connection.end();
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
