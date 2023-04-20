export default async function handler(req, res) {
  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: "cmsc508.com",
    user: "23SP_kalinsazlioef",
    password: "23SP_kalinsazlioef",
    database: "23SP_kalinsazlioef_hr",
  });

  try {
    const query = "SELECT * FROM `employees` WHERE `employee_id` = ?";
    const values = [100];

    const [rows] = await connection.execute(query, values);

    res.status(200).json({ results: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
