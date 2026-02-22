const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (students.html)
app.use(express.static(__dirname));

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbName = "schoolDB";

async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB");
}
connectDB();

app.get("/students", async (req, res) => {
  const db = client.db(dbName);
  const students = await db.collection("students").find().toArray();
  res.json(students);
});


app.get("/students/:id", async (req, res) => {
  const db = client.db(dbName);
  const student = await db
    .collection("students")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(student);
});

// =====================
// ADD STUDENT
// =====================
app.post("/students", async (req, res) => {
  const db = client.db(dbName);
  const newStudent = req.body;
  const result = await db.collection("students").insertOne(newStudent);
  res.json(result);
});

// =====================
// UPDATE STUDENT
// =====================
app.put("/students/:id", async (req, res) => {
  const db = client.db(dbName);
  const updatedData = req.body;

  const result = await db.collection("students").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updatedData }
  );

  res.json(result);
});

// =====================
// DELETE STUDENT
// =====================
app.delete("/students/:id", async (req, res) => {
  const db = client.db(dbName);

  const result = await db.collection("students").deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.json(result);
});

// =====================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});