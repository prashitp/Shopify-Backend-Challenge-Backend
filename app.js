const express = require('express');
const app = express();
app.use(express.json())
const cors = require("cors");
const itemRoute = require('./itemRoutes');

app.use(cors());
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://admin:admin@cluster0.2ulhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {useNewUrlParser: true})
.then (() => {
    console.log("Database connection successful");
})
.catch(() => {
    console.log("Error connecting to database");
})

app.use("/items", itemRoute);

module.exports = app;