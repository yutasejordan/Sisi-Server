const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const database = client.db("dbbuku");
    const books = database.collection("buku");
    const doc = {
      judul: "Pemrograman Backend",
      pengarang: "Bambang Abdulah",
      penerbit: "Andi-Offset",
      harga: 120000,
    };
    const result = await books.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Error during database operation:", error);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
