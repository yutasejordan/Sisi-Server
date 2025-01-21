const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "uas-pss",
  multipleStatements: true,
});

// const fs = require("fs");

// db.query(fs.readFileSync("./uas-pss.sql", "utf-8"), (err) => {
//   if (err) {
//     console.error(err);
//   }
// });

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = db;
