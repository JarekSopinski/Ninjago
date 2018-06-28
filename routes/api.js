const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {
    res.send({type:'GET'})
});

// add a new ninja to the db
router.post('/ninjas', (req, res, next) => {
    // create a new instance of Ninja Model from ninja.js:
    Ninja.create(req.body).then(ninja => {
        // once Promise fullfilled, send data to db:
        res.send(ninja)
    }).catch(next) // in case of error go to the next middleware
});

// update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
    res.send({type:'PUT'})
});

// delete a ninja from the db
router.delete('/ninjas/:id', (req, res, next) => {
    res.send({type:'DELETE'})
});

module.exports = router;