const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const database = client.db("dbbuku");
    const foods = database.collection("buku");
    const docs = [
      {
        judul: "Pemrograman C#",
        pengarang: "Bambang Abdulah",
        penerbit: "Andi-Offset",
        harga: 80000,
      },
      {
        judul: "Pemrograman Java",
        pengarang: "Budi Purnama",
        penerbit: "Andi-Offset",
        harga: 90000,
      },
      {
        judul: "Menggunakan Spring Boot",
        pengarang: "Susi Similiky",
        penerbit: "Andi-Offset",
        harga: 120000,
      },
    ];
    const options = { ordered: true };
    const result = await foods.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
