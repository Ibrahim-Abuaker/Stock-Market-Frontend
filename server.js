const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./dbinit");

const PORT = process.env.PORT || 8090;

app.use(cors())
app.use(express.json())

connectDB();

app.get("/", (req, res)=> {
    res.json("Welcome to my API")
})

app.listen(PORT, ()=> {
    console.log("Listen on Port")
})
