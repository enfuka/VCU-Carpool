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

  //var { email, ride, notes } = req.body;
  var { ride, notes } = req.body;
  const email = session?.email;

  if (notes == "") {
    notes = null;
  }

  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  const query = "CALL sendRequest(?, ?, ?);";
  const values = [email, ride, notes];

  try {
    const [result] = await connection.execute(query, values);
    connection.end();
    //console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
