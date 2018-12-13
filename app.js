const express = require("express");
const mongo_connect = require("./config/mongo_connect_string");
const mongoose = require("mongoose");
const Users = require("./routes/api/users");
const passport = require("passport");
const Profile = require("./routes/api/profile");
const Posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const app = express();

const port = 8081 || process.env.PORT; //remember to swap before deploy to heroku

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", Users);
app.use("/api/profile", Profile);
app.use("/api/posts", Posts);

mongoose
  .connect(
    mongo_connect.connect_string,
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(port, () => console.log(`server running on port ${port}`))
  )
  .catch(err => console.log(err));
