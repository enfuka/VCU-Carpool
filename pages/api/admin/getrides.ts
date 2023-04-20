import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");

  const query =
    'SELECT ride_ID, status, (SELECT street FROM Addresses WHERE address_id = source) AS "From", (SELECT street FROM Addresses WHERE address_id = destination) AS "To", DATE_FORMAT(datetime, \'%W, %e %M %Y %r\'), CONCAT(d.first_name, " ", d.last_name) AS "Driver", CONCAT((SELECT COUNT(request_ID) FROM Requests WHERE ride=ride_ID AND Requests.status="Accepted"),"/",seats) as "Seats", fare, (SELECT CONCAT(v.year," ",v.model) FROM Vehicles v WHERE vehicle=v.vehicle_ID) AS "Vehicle" FROM Rides JOIN Users d ON driver = d.user_ID ORDER BY datetime';

  // create the connection
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    rowsAsArray: true,
  });

  try {
    const [rows] = await pool.query(query);

    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
