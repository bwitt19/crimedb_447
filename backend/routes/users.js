const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Filter = require('../models/filter.model');


// .get endpoint checking to see if an account exists for user log in 
router.route('/login').get((req, res) => {
    
    var in_user = new String(req.body.user_name);
    var in_pass = new String(req.body.password);

    // Check to see if we can find an account with a matching username and password
    User.findOne({ 'user_name': in_user, 'password': in_pass }) 
    .then(userCheck => {

        // If the user did not exist return an error
        if(!userCheck) 
            return res.status(400).json({ 'success': false, 'e_msg': "Incorrect username or password." });
        

        // If the user exists, find all their filters
        Filter.find({ 'user_name': in_user })
        .then(filters => {
            var retArray = []

            // Add all filters to an Array and return them to front-end
            filters.forEach(function(idx) {
                retArray.push(idx);
            });
            return res.json({ 'success': true, 'user_name': in_user, 'user_filters': retArray });

        });
    
    });
});


// .post endpoint to add a new user to the database
router.route('/register').post((req, res) => {  
  
    const in_user = new String(req.body.user_name);
    const in_pass = new String(req.body.password);

    // Check to see if the username already exists
    User.findOne({ 'user_name': in_user }).then(userCheck => {
        
        // If user found
        if(userCheck) 
            return res.status(400).json({ 'success': false, 'e_msg': "Username already registered to an account." });
         
        
        // If the username is not in use, create the account
        else {
                        
            // Create the new user Schema
            var user = new User({
                _id: mongoose.Types.ObjectId(),
                user_name: in_user,
                password: in_pass,
            })            
            
            // Save it to the database
            user.save(function (err, retUser) {
                if (err) return console.error(err);
        
                console.log("New user ("+user._id+") added to account_info collection");
            })
            return res.json({ 'success': true, 'user_name': in_user });
                       
        }
    });
});


module.exports = router;