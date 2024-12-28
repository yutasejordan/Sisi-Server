const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const { loadContact, findContact } = require("./utils/contact");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.get("/", (req, res) => {
  const mhs = [
    { nama: "agus", email: "agus@gmail.com" },
    { nama: "ani", email: "ani@gmail.com" },
  ];
  res.render("index", {
    nama: "FIK",
    title: "Halaman home",
    mhs: mhs,
    layout: "layouts/main-layout",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  //console.log(contacts);
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts: contacts,
  });
});
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Detail Contact",
    contact,
  });
});
app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
