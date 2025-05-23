require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI with environment variables for safety
const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASSWORD}@cluster0.3wn1jax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const hobbyCollection = client.db("hobbyDB").collection("hobbies");
    const myGroupCollection = client.db("hobbyDB").collection("myGroups");

    // POST: Add a new hobby
    app.post("/hobbies", async (req, res) => {
      const result = await hobbyCollection.insertOne(req.body);
      res.send(result);
    });

    // GET: All hobbies
    app.get("/hobbies", async (req, res) => {
      const result = await hobbyCollection.find().toArray();
      res.send(result);
    });

    // POST: Add to My Groups only if not already added
    app.post("/my-groups", async (req, res) => {
      const newGroup = req.body;

      // Convert _id string to ObjectId to ensure consistency
      if (!newGroup._id) {
        return res.status(400).send({ message: "Group must have _id" });
      }

      let objectId;
      try {
        objectId = new ObjectId(newGroup._id);
      } catch {
        return res.status(400).send({ message: "Invalid group ID" });
      }

      newGroup._id = objectId; // replace string _id with ObjectId instance

      const query = { _id: objectId };
      const existing = await myGroupCollection.findOne(query);

      if (existing) {
        return res.status(400).send({ message: "Already added to My Groups" });
      }

      const result = await myGroupCollection.insertOne(newGroup);
      res.send(result);
    });

    // GET: All My Groups
    app.get("/my-groups", async (req, res) => {
      const result = await myGroupCollection.find().toArray();
      res.send(result);
    });

    // DELETE: Delete a group by ID (assuming _id is string)
  app.delete("/my-groups/:id", async (req, res) => {
  const id = req.params.id;
  console.log("DELETE request for group ID:", id);

  try {
   
    const result = await myGroupCollection.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.send({ success: true, message: "Group removed" });
    } else {
      res.status(404).send({ success: false, message: "Group not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
    
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("🎉 Hobby Group Server is Running!");
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
