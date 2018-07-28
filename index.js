const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db');
const path = require('path');
 
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log("Could not connect to MongoDB: ", err)
    }
    else {
        console.log("Connected to Database Successfully: " + config.db)
    }
})

const app = express();

app.use(express.static(__dirname+'/client/src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/src/index.html'))
})

app.listen('8080', () => {
    console.log("Listening to Port 8080");
})