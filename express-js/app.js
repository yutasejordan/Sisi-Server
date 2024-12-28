const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadMhs,
  findMhs,
  addMhs,
  cekDuplikat,
  deleteMhs,
  updateMhs,
} = require("./utils/mahasiswa");

const { body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
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

app.get("/", (req, res) => {
  const mahasiswa = loadMhs();

  res.render("index", {
    title: "Halaman Daftar Mahasiswa",
    layout: "layouts/main-layout",
    mahasiswa,
    msg: req.flash("msg"),
  });
});

app.get("/add", (req, res) => {
  res.render("tambah-mahasiswa", {
    title: "Halaman Tambah Mahasiswa",
    layout: "layouts/main-layout",
  });
});

app.post(
  "/add",
  body("nim").custom((value) => {
    const duplikat = cekDuplikat(value);
    if (duplikat) {
      throw new Error("NIM Sudah Terdaftar!");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("tambah-mahasiswa", {
        title: "Halaman Tambah Mahasiswa",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addMhs(req.body);
      req.flash("msg", "Data Mahasiswa Berhasil Ditambahkan!");
      res.redirect("/");
    }
  }
);

app.get("/delete/:nim", (req, res) => {
  const mhs = findMhs(req.params.nim);

  if (!mhs) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteMhs(req.params.nim);
    req.flash("msg", "Data Mahasiswa Berhasil Dihapus!");
    res.redirect("/");
  }
});

app.get("/edit/:nim", (req, res) => {
  const mhs = findMhs(req.params.nim);

  res.render("edit-mahasiswa", {
    title: "Halaman Edit Mahasiswa",
    layout: "layouts/main-layout",
    mhs,
  });
});

app.post(
  "/update",
  body("nim").custom((value, { req }) => {
    const duplikat = cekDuplikat(value);
    if (value !== req.body.oldNama && duplikat) {
      throw new Error("NIM Sudah Terdaftar!");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-mahasiswa", {
        title: "Halaman Ubah Data Mahasiswa",
        layout: "layouts/main-layout",
        errors: errors.array(),
        mahasiswa: req.body,
      });
    } else {
      updateMhs(req.body);
      req.flash("msg", "Data Mahasiswa Berhasil Diubah!");
      res.redirect("/");
    }
  }
);

app.get("/:nim", (req, res) => {
  const mahasiswa = findMhs(req.params.nim);

  res.render("detail", {
    title: "Halaman Detail Mahasiswa",
    layout: "layouts/main-layout",
    mahasiswa,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
