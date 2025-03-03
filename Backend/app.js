const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const db = require("./dbconnt/conn");
const TaskSchema = require("./models/taskSchema");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// MongoDB Connection
db().then(() => {
  console.log("Connected to the database");
}).catch((err) => {
  console.error("MongoDB Connection Error:", err);
});

// Get All Data
app.get('/', async (req, res) => {
  try {
    const tasks = await TaskSchema.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).send("Error fetching data");
  }
});

// Create Data
app.post('/createData', async (req, res) => {
  try {
    const taskData = new TaskSchema(req.body);
    await taskData.save();
    res.status(201).send('Data Created Successfully!');
  } catch (error) {
    console.error("Error saving data", error);
    res.status(500).send("Error saving data");
  }
});

// Update Data
app.put('/updateData/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await TaskSchema.findByIdAndUpdate(taskId, req.body);
    res.send('Data Updated Successfully!');
  } catch (error) {
    console.error("Error updating data", error);
    res.status(500).send("Error updating data");
  }
});

// Delete Data
app.delete('/deleteData/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await TaskSchema.findByIdAndDelete(taskId);
    res.send('Data Deleted Successfully!');
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).send("Error deleting data");
  }
});

// Serverless Deployment
module.exports.handler = serverless(app);

// Start Server in Local Development Mode
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
