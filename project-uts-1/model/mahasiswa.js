const mongoose = require("mongoose");

const Mhs = mongoose.model("dataMhs", {
  nama: {
    type: String,
    required: true,
  },
  nim: {
    type: String,
    required: true,
  },
  ipk: Number,
});

module.exports = Mhs;
