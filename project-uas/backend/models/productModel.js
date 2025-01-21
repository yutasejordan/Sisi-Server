const db = require("../config/db");

const addProduct = (nama, category_id, harga, jml_stok, callback) => {
  const query =
    "INSERT INTO products (nama, category_id, harga, jml_stok) VALUES (?, ?, ?, ?)";
  db.query(query, [nama, category_id, harga, jml_stok], (err, results) => {
    if (err) return callback(err);
    callback(null, {
      product_id: results.insertId,
      nama,
      category_id,
      harga,
      jml_stok,
    });
  });
};

const getProducts = (callback) => {
  const query = `
    SELECT p.product_id, p.nama AS product_nama, p.harga, p.jml_stok, c.category_id, c.nama AS category_nama
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
  `;
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const getProductById = (product_id, callback) => {
  const query = "SELECT * FROM products WHERE product_id = ?";
  db.query(query, [product_id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) {
      return callback(new Error("Product not found"));
    }
    callback(null, results[0]);
  });
};

const updateProduct = (
  product_id,
  nama,
  category_id,
  harga,
  jml_stok,
  callback
) => {
  const query =
    "UPDATE products SET nama = ?, category_id = ?, harga = ?, jml_stok = ? WHERE product_id = ?";
  db.query(
    query,
    [nama, category_id, harga, jml_stok, product_id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, { product_id, nama, category_id, harga, jml_stok });
    }
  );
};

const deleteProduct = (product_id, callback) => {
  const query = "DELETE FROM products WHERE product_id = ?";
  db.query(query, [product_id], (err, results) => {
    if (err) return callback(err);
    callback(null, { product_id });
  });
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
