const router = require('express').Router();
const User = require('../models/user.model');
var mongoose = require('mongoose');


// .get endpoint checking to see if an account exists for user log in 
router.route('/login').get((req, res) => {
    
    var in_user = new String(req.body.user_name);
    var in_pass = new String(req.body.password);
    
    // Check to see if we can find an account with a matching username and password
    User.findOne({
        'user_name': { in_user },
        'password': { in_pass }
    }) 
    
    // If the user exists, return their filters that they have saved
    .then(users => res.json({ success: true, filters: users.filters }))
    .catch(err => res.status(400).json({ success: false, e_msg: "Incorrect username or password." }));   
    
    return res;
});


// .post endpoint to add a new user to the database
router.route('/register').post((req, res) => {  
  
    const in_user = new String(req.body.user_name);
    const in_pass = new String(req.body.password);
  
    // Check to see if the username already exists
    User.findOne({ user_name: in_user }).then(userCheck => {
        
        // If user found
        if(userCheck) {
            return res.status(400).json({ success: false, e_msg: "Username already exists." });
        } 
        
        // If the username is not in use, create the account
        else {
                        
            // Create the new user Schema
            var user = new User({
                _id: mongoose.Types.ObjectId(),
                user_name: in_user,
                password: in_pass,
                filters: []
            })            
            
            // Save it to the database
            user.save(function (err, retUser) {
                if (err) return console.error(err);
        
                console.log("New user ("+user._id+") added to account_info collection");
            })
            return res.json({ success: true });
                       
        }
    });
});


// .put endpoint to update the filters for a user
router.route('/filter').put((req, res) => {
    
    const in_filters = new Array(req.body.filters);
    const in_user = new String(req.body.user_name);

    // Find the current user and update their filters array
    User.findOneAndUpdate( {user_name: in_user}, {filters: in_filters} ).then(userCheck => {
        
        // If no user found
        if(!userCheck) {
            return res.status(400).json({ success: false, e_msg: "Error in updating filter" });
        } 

        // Return that the change was successful
        return res.json({ success: true });

    });
    
});


module.exports = router;