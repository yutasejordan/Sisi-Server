const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // Get the database and collection on which to run the operation
    const database = client.db("dbbuku");
    const books = database.collection("buku");
    // Query for a books that has the title ' Belajar Docker '
    const query = { judul: "Pemrograman Backend" };
    const options = {
      // Sort matched documents in descending order by rating
      sort: { harga: -1 },
      // Include only the `judul` and `harga` fields in the returned document
      projection: { _id: 0, judul: 1, harga: 1 },
    };
    // Execute query
    const book = await books.findOne(query, options);
    // Print the document returned by findOne()
    console.log(book);
  } catch (error) {
    console.error("Error during database operation:", error);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
