const express = require('express');

const port = 4000;

// set up express app
const app = express();

// listen for requests
app.listen(process.env.port || port, () => {
    console.log('Now listening for requests');
});