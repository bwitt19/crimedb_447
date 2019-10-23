const router = require('express').Router();
let User = require('../models/user.model');

// .get endpoint checking to see if an account exists for user log in 
router.route('/').get((req, res) => {
    
    // Check to see if we can find an account with a matching username and password
    User.find({
        'user': { req.body.user },
        'pass': { req.body.pass }
    }) 
    
    // If the user exists, return their filters that they have saved
    .then(users => res.json(users.filters))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;