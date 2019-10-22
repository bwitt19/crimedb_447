const router = require('express').Router();
let Crime = require('../models/crime.model');

// .get endpoint for crimes/ 
router.route('/').get((req, res) => {
    console.log('/');
    Crime.find() // mongoose method, gets all crimes from db
    .then(crimes => res.json(crimes))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
