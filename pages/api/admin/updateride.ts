import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { driver, fare, from, to, ride_ID, seats, status, time, vehicle } =
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
    "UPDATE `Rides` SET driver=?, fare=?, source=?, destination=?, seats=?, status=?, datetime=?, vehicle=? WHERE ride_ID=?";
  const values = [
    driver,
    fare,
    from,
    to,
    seats,
    status,
    time,
    vehicle,
    ride_ID,
  ];

  const [result] = await connection.execute(query, values);
  connection.end();
  res.status(200).json(result);
}
