import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const email = session?.email;

  const query =
    'SELECT CONCAT(make," ",model), vehicle_ID, license_plate, make, model, year,color, (SELECT COUNT(*) FROM Drivers WHERE vehicle_ID=default_vehicle) AS "default" FROM Vehicles WHERE owner=(SELECT user_ID FROM Users WHERE email=?) ORDER BY "default" DESC;';

  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    rowsAsArray: true,
  });

  try {
    const [rows] = await connection.query(query, [email]);
    connection.end();
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
