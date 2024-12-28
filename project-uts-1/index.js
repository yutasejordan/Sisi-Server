const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");

const { body, validationResult } = require("express-validator");

const Mhs = require("./model/mahasiswa");
require("./utils/db");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", async (req, res) => {
  const mahasiswa = await Mhs.find();

  res.render("mahasiswa", {
    title: "Halaman Daftar Mahasiswa",
    layout: "layouts/main-layout",
    mahasiswa,
    msg: req.flash("msg"),
  });
});

app.get("/add", (req, res) => {
  res.render("tambah-mahasiswa", {
    title: "Halaman Tambah Data",
    layout: "layouts/main-layout",
  });
});

app.post(
  "/add",
  body("nim").custom(async (value) => {
    const duplicate = await Mhs.findOne({ nim: value });
    if (duplicate) {
      throw new Error("NIM Sudah Terdaftar!");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("tambah-mahasiswa", {
        title: "Halaman Tambah Data",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      Mhs.insertMany(req.body, (error, result) => {
        req.flash("msg", "Data Mahasiswa Berhasil Ditambahkan!");
        res.redirect("/");
      });
    }
  }
);

app.get("/:nim", async (req, res) => {
  const mahasiswa = await Mhs.findOne({ nim: req.params.nim });

  res.render("detail", {
    title: "Halaman Detail Mahasiswa",
    layout: "layouts/main-layout",
    mahasiswa,
  });
});

app.listen(port, () => {
  console.log(`Apps running at http://localhost:${port}`);
});
