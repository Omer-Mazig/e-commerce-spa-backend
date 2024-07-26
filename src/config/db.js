// config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MongoURI is missing");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true, // To avoid deprecation warning
      // useUnifiedTopology: true, // To avoid deprecation warning
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
}

module.exports = { connectDB };
