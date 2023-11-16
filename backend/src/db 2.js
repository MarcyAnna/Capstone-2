const { Client } = require("pg");

const DB_URI = "postgres://pqfuvhmm:pfVGXQgcbO419MIW7T1Vmhr9aK98lTQ_@mahmud.db.elephantsql.com/pqfuvhmm"; 

const db = new Client({
  connectionString: DB_URI
});

db.connect()
  // .then(() => {
  //   console.log("Connected to PostgreSQL database");
  // })
  // .catch((err) => {
  //   console.error("Error connecting to the database:", err);
  // });



module.exports = db;