const router = require('express').Router();
let User = require('../models/user.model');

// .get endpoint checking to see if an account exists for user log in 
router.route('/').get((req, res) => {
    
    var user = new String(req.body.user);
    var pass = new String(req.body.pass);
    
    // Check to see if we can find an account with a matching username and password
    User.findOne({
        'user': { user },
        'pass': { pass }
    }) 
    
    // If the user exists, return their filters that they have saved
    .then(users => res.json(users.filters))
    .catch(err => res.status(400).json('Error: ' + err));
});

// .post endpoint to add a new user to the database
router.route('/').post((req, res) => {
    
    // Create the new user Schema
    var user = new User({
        user: req.body.user,
        pass: req.body.pass,
        filters: []
    });
        
    // Save it to the database
    user.save(function (err, retUser) {
        if (err) return console.error(err);
        
        console.log(retUser._id + "Saved to account collection");
    });    
    
});

module.exports = router;