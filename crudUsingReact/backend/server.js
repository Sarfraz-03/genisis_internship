const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

// Allow React frontend (Vite default port 5173)
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbName = "schoolDB";

async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB");
}
connectDB();

// ================= GET ALL =================
app.get("/students", async (req, res) => {
  const db = client.db(dbName);
  const students = await db.collection("students").find().toArray();
  res.json(students);
});

// ================= GET BY ID =================
app.get("/students/:id", async (req, res) => {
  const db = client.db(dbName);
  const student = await db
    .collection("students")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(student);
});

// ================= ADD =================
app.post("/students", async (req, res) => {
  const db = client.db(dbName);
  const result = await db.collection("students").insertOne(req.body);
  res.json(result);
});

// ================= UPDATE =================
app.put("/students/:id", async (req, res) => {
  const db = client.db(dbName);
  const result = await db.collection("students").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
});

// ================= DELETE =================
app.delete("/students/:id", async (req, res) => {
  const db = client.db(dbName);
  const result = await db.collection("students").deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json(result);
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});