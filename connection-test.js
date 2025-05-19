const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Get the connection string from .env file
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // List all databases (if you have permissions)
    const dbList = await client.db().admin().listDatabases();
    console.log("\nAvailable databases:");
    dbList.databases.forEach(db => {
      console.log(` - ${db.name}`);
    });
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);