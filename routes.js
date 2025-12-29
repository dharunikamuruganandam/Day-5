const express = require("express");
const router = express.Router();
const db = require("./db");
const { userSchema } = require("./validations");


// 🔹 CREATE user
router.post("/users", async (req, res) => {
  try {
    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map(e => e.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const result = await db.insert(parsed.data);
    res.status(201).json({ message: "User saved successfully", id: result.id });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Failed to save user", error: err.message });
  }
});


// 🔹 GET all users
router.get("/users", async (req, res) => {
  try {
    const result = await db.list({ include_docs: true });
    const users = result.rows.map(r => r.doc);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});


// 🔹 GET user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await db.get(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found", error: err.reason });
  }
});


// 🔹 UPDATE user (PUT)
router.put("/users/:id", async (req, res) => {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(e => e.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const existing = await db.get(req.params.id);

    const updated = {
      ...existing,
      ...parsed.data,
      _id: existing._id,
      _rev: existing._rev
    };

    const result = await db.insert(updated);
    res.json({ message: "User updated", id: result.id });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});


// 🔹 DELETE user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await db.get(req.params.id);
    await db.destroy(user._id, user._rev);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
