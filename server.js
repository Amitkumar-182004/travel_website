const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/* =======================
MongoDB Connection
======================= */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

/* =======================
Schema + Model
======================= */
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  person: String,
  month: String,
});

const Form = mongoose.model("Form", formSchema);

/* =======================
Routes
======================= */

// Test route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// Form submit route
app.post("/api/form", async (req, res) => {
  try {
    const data = new Form(req.body);
    await data.save();

    res.json({ message: "Data Saved Successfully ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving data ❌" });
  }
});

// Get all data (for admin)
app.get("/api/form", async (req, res) => {
  const data = await Form.find();
  res.json(data);
});

// Delete route
app.delete("/api/form/:id", async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* =======================
Server Start
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});