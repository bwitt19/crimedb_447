const router = require('express').Router();
let User = require('../models/user.model');

// .get endpoint for / 
router.route('/').get((req, res) => {
    User.find() // mongoose method, gets all crimes from db
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;