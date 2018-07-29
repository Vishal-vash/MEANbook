const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db');
const path = require('path');
//const cors = require('cors');

const auth = require('./routes/auth');

mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log("Could not connect to MongoDB: ", err)
    }
    else {
        console.log("Connected to Database Successfully: " + config.db)
    }
})

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(cors({
//    origin: 'http://localhost:4200',
//    optionsSuccessStatus: 200
// }))
app.use(express.json());
app.use(express.static(__dirname + '/client/dist'));
app.use('/api/auth', auth);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

app.listen('8080', () => {
    console.log("Listening to Port 8080");
})