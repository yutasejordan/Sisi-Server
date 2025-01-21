const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = (username, email, password, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) return callback(err);
      callback(null, { user_id: results.insertId, username, email });
    });
  });
};

const loginUser = (email, password, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) {
      return callback(new Error("User not found"));
    }

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return callback(err);
      if (!isMatch) {
        return callback(new Error("Invalid password"));
      }

      const token = jwt.sign(
        { user_id: results[0].user_id, username: results[0].username },
        "mysecretkey",
        { expiresIn: "1h" }
      );

      callback(null, {
        user_id: results[0].user_id,
        username: results[0].username,
        token,
      });
    });
  });
};

const getUserById = (user_id, callback) => {
  const query = "SELECT * FROM users WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) {
      return callback(new Error("User not found"));
    }
    callback(null, results[0]);
  });
};

module.exports = { registerUser, loginUser, getUserById };
