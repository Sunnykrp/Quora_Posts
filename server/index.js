const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes.js");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5174",
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsInsecure: false,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server running`);
});
  });
