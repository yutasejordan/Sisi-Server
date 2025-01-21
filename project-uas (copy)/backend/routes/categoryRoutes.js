const express = require("express");
const { addCategory, getCategories } = require("../models/categoryModel");
const router = express.Router();

router.post("/", (req, res) => {
  const { nama } = req.body;
  addCategory(nama, (err, newCategory) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error adding category", error: err });
    res.status(201).json(newCategory);
  });
});

router.get("/", (req, res) => {
  getCategories((err, categories) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching categories", error: err });
    res.status(200).json(categories);
  });
});

router.get("/:category_id", (req, res) => {
  const { category_id } = req.params;

  getCategoryById(category_id, (err, category) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching category", error: err });
    res.status(200).json(category);
  });
});

router.put("/:category_id", (req, res) => {
  const { category_id } = req.params;
  const { name } = req.body;

  updateCategory(category_id, name, (err, updatedCategory) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error updating category", error: err });
    res.status(200).json(updatedCategory);
  });
});

router.delete("/:category_id", (req, res) => {
  const { category_id } = req.params;

  deleteCategory(category_id, (err, deletedCategory) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting category", error: err });
    res.status(200).json(deletedCategory);
  });
});

module.exports = router;
