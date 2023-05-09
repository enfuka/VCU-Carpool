import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");

  const { vehicle_ID, license_plate, make, model, year, color, owner } =
    req.body;

  const query =
    "UPDATE Vehicles SET license_plate=?, make=?, model=?, year=?, color=?, owner=? WHERE vehicle_ID=?;";

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  const values = [license_plate, make, model, year, color, owner, vehicle_ID];

  try {
    console.log(req.body);
    const [rows] = await connection.query(query, values);

    // if (isDefault) {
    //   await connection.query(
    //     "UPDATE Drivers SET default_vehicle=? WHERE user_ID=(SELECT user_ID FROM Users WHERE email=?);",
    //     [vehicle_ID, email]
    //   );
    // } else {
    //   //TODO
    //   // const [rows] = await pool.query(
    //   //   "SELECT default_vehicle FROM Drivers WHERE user_ID=(SELECT user_ID FROM Users WHERE email=?",
    //   //   [vehicle_ID, email]
    //   // );
    //   // if(rows[0].default_vehicle==vehicle_ID){
    //   // }
    // }
    connection.end();
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
