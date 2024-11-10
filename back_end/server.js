require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("meal"); // Use the 'meal' database

    // Route for adding item to the 'Taka' collection
    app.post("/api/add-to-taka", async (req, res) => {
      const formData = req.body;
      try {
        const takaCollection = database.collection("Taka"); // Access the 'Taka' collection
        const result = await takaCollection.insertOne(formData); // Insert the form data into 'Taka'
        res.status(200).json({ result });
      } catch (error) {
        console.error("Error inserting data into 'Taka' collection:", error);
        res
          .status(500)
          .json({ error: "Failed to insert data into 'Taka' collection" });
      }
    });

    // Route for fetching data from the 'Taka' collection
    app.get("/api/get-taka", async (req, res) => {
      try {
        const takaCollection = database.collection("Taka");
        const items = await takaCollection
          .find({})
          .sort({ _id: -1 }) // Sort by _id in descending order (newest first)
          .toArray(); // Fetch all items from the 'Taka' collection
        res.status(200).json(items);
      } catch (error) {
        console.error("Error fetching data from 'Taka' collection:", error);
        res
          .status(500)
          .json({ error: "Failed to fetch data from 'Taka' collection" });
      }
    });

    // Route for deleting data from the 'Taka' collection
    app.delete("/api/delete-taka/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const takaCollection = database.collection("Taka");
        const result = await takaCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Item deleted successfully" });
        } else {
          res.status(404).json({ message: "Item not found" });
        }
      } catch (error) {
        console.error("Error deleting data from 'Taka' collection:", error);
        res
          .status(500)
          .json({ error: "Failed to delete data from 'Taka' collection" });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main().catch(console.error);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
