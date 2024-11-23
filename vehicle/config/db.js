const mysql = require("mysql2");
const connection = mysql.createPool({
  port: 25817,
  host: "mysql-2df970b1-viti-db20.b.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_zVb3I45JzpdvTf7Dbpp",
  database: "curs_vehicle",
}).promise();
module.exports = connection;
