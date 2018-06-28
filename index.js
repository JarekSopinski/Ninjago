const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 4000;

// set up express app
const app = express();

// connect to mongo db
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(bodyParser.json()); // first middleware

// initialize routes specified in api.js file
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(process.env.port || port, () => {
    console.log('Now listening for requests');
});