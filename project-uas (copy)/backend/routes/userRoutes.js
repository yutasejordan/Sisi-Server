const express = require("express");
const { registerUser, loginUser, getUserById } = require("../models/userModel");
const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  registerUser(username, email, password, (err, newUser) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error registering user", error: err });
    res.status(201).json(newUser);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  loginUser(email, password, (err, userData) => {
    if (err)
      return res.status(500).json({ message: "Error logging in", error: err });
    res.status(200).json(userData);
  });
});

router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;

  getUserById(user_id, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching user", error: err });
    res.status(200).json(user);
  });
});

router.post("/logout", (req, res) => {
  // Untuk logout, cukup informasikan ke client untuk menghapus token mereka
  res.status(200).json({ message: "Successfully logged out" });
});

module.exports = router;
