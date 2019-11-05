const router = require('express').Router();
const User = require('../models/user.model');
const Filter = require('../models/filter.model');
var mongoose = require('mongoose');


// .get endpoint checking to see if an account exists for user log in 
router.route('/api/login').get((req, res) => {
    
    var in_user = new String(req.body.user_name);
    var in_pass = new String(req.body.password);
    
    // Check to see if we can find an account with a matching username and password
    User.findOne({ 'user_name': { in_user }, 'password': { in_pass } }) 
    .then(userCheck => {

        // If the user did not exist return an error
        if(!userCheck) {
            return res.status(400).json({ success: false, e_msg: "Incorrect username or password." });
        }

        // If the user exists, find all their filters
        Filter.find({ 'user_name': { in_user } })
        .then(filters => {
            var retArray = []

            // If they haven't created any filters yet, return an exmpty list!!!!!!
            if(!filters) {
                return res.json({ success: true, filter_names: retArray});
            }

            // If there are filters, add them to an Array to return to front-end
            filters.forEach(function(idx) {
                retArray.push(idx);
            });
            return res.json({ success: true, user_filters: retArray });

        });
    
    });
});


// .post endpoint to add a new user to the database
router.route('/api/register').post((req, res) => {  
  
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


module.exports = router;