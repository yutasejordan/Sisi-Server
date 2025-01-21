const db = require("../config/db");

const addCategory = (nama, callback) => {
  const query = "INSERT INTO categories (nama) VALUES (?)";
  db.query(query, [nama], (err, results) => {
    if (err) return callback(err);
    callback(null, { category_id: results.insertId, nama });
  });
};

const getCategories = (callback) => {
  const query = "SELECT * FROM categories";
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const getCategoryById = (category_id, callback) => {
  const query = "SELECT * FROM categories WHERE category_id = ?";
  db.query(query, [category_id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) {
      return callback(new Error("Category not found"));
    }
    callback(null, results[0]);
  });
};

const updateCategory = (category_id, name, callback) => {
  const query = "UPDATE categories SET name = ? WHERE category_id = ?";
  db.query(query, [name, category_id], (err, results) => {
    if (err) return callback(err);
    callback(null, { category_id, name });
  });
};

const deleteCategory = (category_id, callback) => {
  const query = "DELETE FROM categories WHERE category_id = ?";
  db.query(query, [category_id], (err, results) => {
    if (err) return callback(err);
    callback(null, { category_id });
  });
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
