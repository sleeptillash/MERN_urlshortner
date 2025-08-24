const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const urlRoutes = require("./routes/url");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", urlRoutes);
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS;
console.log("Admin pass from env:", adminPass);
