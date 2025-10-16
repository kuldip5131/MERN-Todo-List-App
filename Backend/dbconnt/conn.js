const mongoose = require("mongoose");

const url = "mongodb+srv://kuldip5131:Kuldip%405131@mern-todo-list-app.yf2fboi.mongodb.net/todoDB?retryWrites=true&w=majority";

const dbconnection = async () => {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = dbconnection;
