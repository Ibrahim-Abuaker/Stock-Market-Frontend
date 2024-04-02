const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./dbinit");

const PORT = process.env.PORT || 8090;

connectDB();
