const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/product.route"));

module.exports = app;
