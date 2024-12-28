const fs = require("fs");

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}

if (!fs.existsSync("./data/mahasiswa.json")) {
  fs.writeFileSync("./data/mahasiswa.json", "[]", "utf-8");
}

const loadMhs = () => {
  const fileBuffer = fs.readFileSync("data/mahasiswa.json", "utf-8");
  const mahasiswa = JSON.parse(fileBuffer);
  return mahasiswa;
};

const findMhs = (nim) => {
  const mahasiswa = loadMhs();
  const mhs = mahasiswa.find((mhs) => mhs.nim === nim);
  return mhs;
};

const saveMhs = (mahasiswa) => {
  fs.writeFileSync("data/mahasiswa.json", JSON.stringify(mahasiswa));
};

const addMhs = (mhs) => {
  const mahasiswa = loadMhs();
  mahasiswa.push(mhs);
  saveMhs(mahasiswa);
};

const cekDuplikat = (nim) => {
  const mahasiswa = loadMhs();
  return mahasiswa.find((mhs) => mhs.nim === nim);
};

const deleteMhs = (nim) => {
  const mahasiswa = loadMhs();
  const filteredMahasiswa = mahasiswa.filter((mhs) => mhs.nim !== nim);
  saveMhs(filteredMahasiswa);
};

const updateMhs = (mhsBaru) => {
  const mahasiswa = loadMhs();
  const filteredMahasiswa = mahasiswa.filter(
    (mhs) => mhs.nim !== mhsBaru.oldNim
  );

  delete mhsBaru.oldNim;
  filteredMahasiswa.push(mhsBaru);
  saveMhs(filteredMahasiswa);
};

module.exports = {
  loadMhs,
  findMhs,
  addMhs,
  cekDuplikat,
  deleteMhs,
  updateMhs,
};
