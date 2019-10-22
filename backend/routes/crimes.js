const router = require('express').Router();
let Crime = require('../models/crime.model');

// crimes route endpoints 

// .get endpoint will get first 5, for testing
router.route('/').get((req, res) => {
    console.log('/');
    Crime.find().limit(5)
    .then(crimes => res.json(crimes))
    .catch(err => res.status(400).json('Error: ' + err));
});


// .post filtering endpoint
router.route('/').post((req, res) => {

    const date = new Date(req.body.date);
    
    var year=date.getYear();
    console.log(`${year +1900}`);
    
    // all found entries added to crimes variable
    Crime.find({
        'date': { $lte: date }
    }).limit(5)    
    
    .then(crimes => {res.json(crimes)})
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
