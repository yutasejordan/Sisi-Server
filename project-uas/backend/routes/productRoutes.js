const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../models/productModel");
const router = express.Router();

router.post("/", (req, res) => {
  const { nama, category_id, harga, jml_stok } = req.body;
  addProduct(nama, category_id, harga, jml_stok, (err, newProduct) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error adding product", error: err });
    res.status(201).json(newProduct);
  });
});

router.get("/", (req, res) => {
  getProducts((err, products) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching products", error: err });
    res.status(200).json(products);
  });
});

router.get("/:product_id", (req, res) => {
  const { product_id } = req.params;

  getProductById(product_id, (err, product) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching product", error: err });
    res.status(200).json(product);
  });
});

router.put("/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { nama, category_id, harga, jml_stok } = req.body;

  updateProduct(
    product_id,
    nama,
    category_id,
    harga,
    jml_stok,
    (err, updatedProduct) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating product", error: err });
      res.status(200).json(updatedProduct);
    }
  );
});

router.delete("/:product_id", (req, res) => {
  const { product_id } = req.params;

  deleteProduct(product_id, (err, deletedProduct) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting product", error: err });
    res.status(200).json(deletedProduct);
  });
});

module.exports = router;
