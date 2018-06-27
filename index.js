const express = require('express');
const bodyParser = require('body-parser');

const port = 4000;

// set up express app
const app = express();

app.use(bodyParser.json());

// initialize routes specified in api.js file
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(process.env.port || port, () => {
    console.log('Now listening for requests');
});