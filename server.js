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
mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
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

/* =======================
Server Start
======================= */
app.listen(5000, () => {
console.log("Server running on port 5000 🚀");
});
// Delete route
app.delete("/api/form/:id", async (req, res) => {
await Form.findByIdAndDelete(req.params.id);
res.json({ message: "Deleted" });
});