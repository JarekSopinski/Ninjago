const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 4000;

// set up express app
const app = express();

// connect to mongo db
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// MIDDLEWARE STACK

// 1st middleware - serve static files
app.use(express.static('public'));

// 2nd middleware - parse data
app.use(bodyParser.json());

// 3rd middleware - initialize routes specified in api.js file
app.use('/api', require('./routes/api'));

// 4th middleware - error handling (custom middleware)
app.use((err,req,res,next) => {
    //console.log(err)
    // change status, then return error msg:
    res.status(422).send({error: err.message});
})

// END OF MIDDLEWARE STACK

// listen for requests
app.listen(process.env.port || port, () => {
    console.log('Now listening for requests');
});