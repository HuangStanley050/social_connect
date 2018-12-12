const express = require("express");
const mongo_connect = require("./config/mongo_connect_string").connect_string;
const mongoose = require("mongoose");
const app = express();

const port = 8081 || process.env.PORT; //remember to swap before deploy to heroku

app.get("/", (req, res) => res.send("hello world"));

mongoose
  .connect(
    mongo_connect,
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(port, () => console.log(`server running on port ${port}`))
  )
  .catch(err => console.log(err));
