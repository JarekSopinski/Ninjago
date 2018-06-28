const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {

    /*
    To get all ninjas:
    Ninja.find({}).then(ninjas => {
        res.send(ninjas)
    })
    */
   /*
   Outdated example from tutorial:
   Ninja.geoNear(
       {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lnt)]},
       {maxDistance: 100000, spherical: true}
    ).then(ninjas => {
        res.send(ninjas)
    })
    */
   
    Ninja.aggregate().near({
        near: {
         'type': 'Point',
         'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis"
       }).then(ninjas => {
        res.send(ninjas)
    })

});

// Example GET request: localhost:4000/api/ninjas?lng=-80&lat=25

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
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        //after updating data in db, find updated record:
        Ninja.findOne({_id: req.params.id}).then(ninja => {
            // then send back updated ninja:
            res.send(ninja)
        });
    });
});

// delete a ninja from the db
router.delete('/ninjas/:id', (req, res, next) => {
    // findByIdAndRemove - a mongoose method; compare id from url params with _id in DB:
    Ninja.findByIdAndRemove({_id: req.params.id}).then(ninja => {
        // a Promise returns the ninja that was removed - we can send it in res:
        res.send(ninja)
    });
});

module.exports = router;