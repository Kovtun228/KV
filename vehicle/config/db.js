const mysql = require("mysql2");
const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Maksym1102",
  database: "curs_vehicle",
}).promise();
module.exports = connection;
