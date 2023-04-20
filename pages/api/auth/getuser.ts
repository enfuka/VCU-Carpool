import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  if (false) {
    res.status(400).send("User already exists");
  } else {
    const mysql = require("mysql2/promise");
    // create the connection
    const connection = await mysql.createConnection({
      host: "cmsc508.com",
      user: "23SP_kalinsazlioef",
      password: "23SP_kalinsazlioef",
      database: "23SP_kalinsazlioef_pr",
    });
    const query =
      "SELECT user_id as id, email, password FROM `Users` WHERE email=?";
    const values = [email];

    const [user] = await connection.execute(query, values);
    //console.log(user);

    res.status(200).json(user);
  }
}
