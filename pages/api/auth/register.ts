import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, firstname, lastname, gender, phonenumber } =
    req.body;
  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  });

  const [rows] = await connection.execute(
    "SELECT COUNT(user_id) AS cnt FROM Users WHERE email=?",
    [email]
  );
  console.log(rows);
  if (rows[0].cnt === 1) {
    res.status(400).send("User already exists");
  } else {
    const query =
      "INSERT INTO `Users` (email, password, first_name, last_name, gender, phone) VALUES (?,?,?,?,?,?)";
    const values = [
      email,
      await hash(password, 10),
      firstname,
      lastname,
      gender,
      phonenumber,
    ];

    const [result] = await connection.execute(query, values);

    res.status(200).json(result);
  }
}
