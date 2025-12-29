require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const routes = require("./routes");

// health check
app.get("/", (req, res) => {
  res.send("Zod + CouchDB API is running 🚀");
});

// API routes → /api/users
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
