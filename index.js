const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./AuthRouter");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 6000;
const MONGO_DB = process.env.MONGO_DB || null;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    if (MONGO_DB) {
      await mongoose.connect(MONGO_DB);
    }

    !MONGO_DB && console.log("Mongo DB conection is unavailable!");

    app.listen(PORT, () => {
      console.log("Server has started on port " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();