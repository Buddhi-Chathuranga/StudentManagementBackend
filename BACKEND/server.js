const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("Mongo DB connection Successful");
})

const studentRouter = require("./routes/Students.js");
const lecturerRouter = require("./routes/Lecturers.js");

app.use("/student",studentRouter)
app.use("/lecturer",lecturerRouter)

app.listen(PORT, () =>{
    console.log('Server is up and running : '+PORT)
})