const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js CRUD API!");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});
