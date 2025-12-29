require("dotenv").config();
const Nano = require("nano");

const nano = Nano(process.env.COUCHDB_URL);
const db = nano.db.use(process.env.DB_NAME);

console.log("Couch URL:", process.env.COUCHDB_URL);

module.exports = db;
