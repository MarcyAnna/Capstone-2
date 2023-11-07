const { Client } = require("pg");

const DB_URI = "postgresql://postgres:password@localhost:5432/myhealth"; 

const db = new Client({
  connectionString: DB_URI
});

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

module.exports = db;