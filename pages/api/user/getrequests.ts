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

  var { ride, notes } = req.body;
  const email = session?.email;

  const mysql = require("mysql2/promise");

  const query =
    'SELECT (SELECT street FROM Addresses WHERE address_id = source) AS "from", (SELECT street FROM Addresses WHERE address_id = destination) AS "to",(SELECT CONCAT(street, ", ", city," ",state,", ",zip) FROM Addresses WHERE address_id = source) AS "source", (SELECT CONCAT(street, ", ", city," ",state,", ",zip) FROM Addresses WHERE address_id = destination) AS "destination", ride_ID, r.status, DATE_FORMAT(datetime, "%W, %e %M %Y %r") as "time", CONCAT(d.first_name, " ", d.last_name) AS "driver", CONCAT((SELECT COUNT(request_ID) FROM Requests WHERE ride=ride_ID AND Requests.status="Accepted"),"/",seats) as "seats", fare, (SELECT CONCAT(v.year," ",v.model) FROM Vehicles v WHERE vehicle=v.vehicle_ID) AS "vehicle",rq.request_ID AS "request_id", rq.status as "request_status" FROM Rides r JOIN Users d ON r.driver = d.user_ID JOIN Requests rq ON(r.ride_ID=rq.ride) WHERE rq.rider=(SELECT user_ID FROM Users WHERE email=?) ORDER BY datetime;';

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
