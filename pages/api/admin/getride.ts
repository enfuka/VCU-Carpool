import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mysql = require("mysql2/promise");
  const { id } = req.body;

  const query1 =
    'SELECT ride_ID, status, (SELECT street FROM Addresses WHERE address_id = source) AS "from", (SELECT street FROM Addresses WHERE address_id = destination) AS "to", DATE_FORMAT(datetime, \'%W, %e %M %Y %r\') as "time", CONCAT(d.first_name, " ", d.last_name) AS "driver", CONCAT((SELECT COUNT(request_ID) FROM Requests WHERE ride=ride_ID AND Requests.status="Accepted"),"/",seats) as "Seats", fare, (SELECT CONCAT(v.year," ",v.model) FROM Vehicles v WHERE vehicle=v.vehicle_ID) AS "vehicle" FROM Rides JOIN Users d ON driver = d.user_ID WHERE ride_ID=?';

  const query2 =
    'SELECT ride_ID, status, source as "from", destination "to", datetime as "time", driver, seats, fare, vehicle FROM Rides JOIN Users d ON driver = d.user_ID WHERE ride_ID=?';

  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  try {
    const [rows] = await connection.query(query1, [id]);
    const [row] = await connection.query(query2, [id]);
    connection.end();
    console.log(rows);
    rows.push(row[0]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
