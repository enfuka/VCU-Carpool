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

  var { source, destination, time, vehicle, seats, fare, notes } = req.body;

  if (notes == "") {
    notes = null;
  }
  //const from = Object.values(source).join()

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  const query = "CALL createRide (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
  const values = [
    source.street,
    source.city,
    source.state,
    source.zip,
    destination.street,
    destination.city,
    destination.state,
    destination.zip,
    time,
    vehicle,
    seats,
    fare,
    notes,
    email,
  ];

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
