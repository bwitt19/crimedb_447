const router = require('express').Router();
const User = require('../models/user.model');

/*
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
*/

// .post endpoint to add a new user to the database
router.post("/register", (req, res) => {
    
    // Check to see if the username already exists
    User.findOne({ user_name: req.body.user_name }).then(userCheck => {
        if(userCheck) {
            return res.status(400).json({ userCheck: "Username already exists." });
        } 
        
        // If the username is not in use create the account
        else {
            // Create the new user Schema
            var user = new User({
                _id: "1",
                user_name: req.body.user_name,
                password: req.body.password,
                filters: []
            });
            
            
            // Save it to the database
            user.save(function (err, retUser) {
                if (err) return console.error(err);
        
                console.log(retUser._id + "Saved to account collection");
            })
            .then(user => res.json(user))
            .catch(err => console.log(err));
            
        }
    });
});

module.exports = router;