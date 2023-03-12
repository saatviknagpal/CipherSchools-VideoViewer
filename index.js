require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const signup = require("./src/routes/signup");
const login = require("./src/routes/login");
const upload = require("./src/routes/upload");
const videoList = require("./src/routes/videoList");
const videoDetails = require("./src/routes/videoDetails");
const comment = require("./src/routes/comment");
const likes = require("./src/routes/like");
const dislikes = require("./src/routes/dislike");
const views = require("./src/routes/views");
const reply = require("./src/routes/reply");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());

const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const checkauth = require("./src/middlewares/checkauth");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); //only for single objects
app.use(bodyParser.json());

//Routes
app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/upload", checkauth, upload);
app.use("/api/videoList", videoList);
app.use("/api/videoDetails", videoDetails);
app.use("/api/addComment", checkauth, comment);
app.use("/api/like", checkauth, likes);
app.use("/api/dislike", checkauth, dislikes);
app.use("/api/views", views);
app.use("/api/reply", checkauth, reply);
app.use("/api/getComment", checkauth, comment);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
