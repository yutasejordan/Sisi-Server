const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const database = client.db("dbbuku");
    const books = database.collection("buku");
    const query = { harga: { $gte: 100000 } };
    const options = {
      sort: { judul: 1 },
      projection: { _id: 0, judul: 1, harga: 1 },
    };
    const cursor = books.find(query, options);
    if ((await books.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {
      console.dir(doc);
    }
  } catch (error) {
    console.error("Error during database operation:", error);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
