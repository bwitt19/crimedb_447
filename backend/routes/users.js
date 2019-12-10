const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Filter = require('../models/filter.model');


// .get endpoint checking to see if an account exists for user log in 
router.route('/login').get((req, res) => {
    
    var in_user = String(req.query.user_name);
    var in_pass = String(req.query.password);

    // Check to see if we can find an account with a matching username and password
    User.findOne({ 'user_name': in_user}) 
    .then(userCheck => {

        // If the user did not exist return an error
        if(!userCheck) 
            return res.status(400).json({ 'success': false, 'e_msg': "Incorrect username or password." });
        
        // Make sure correct password is entered
        if(!bcrypt.compareSync(in_pass, userCheck.password))
            return res.status(400).json({ 'success': false, 'e_msg': "Incorrect username or password."});


        // If the user exists, find all their filters
        Filter.find({ 'user_name': in_user })
        .then(filters => {
            var retArray = []

            // Add all filters to an Array and return them to front-end
            filters.forEach(function(idx) {
                retArray.push(idx);
            });

            // Create a token
            var token = jwt.sign({id: userCheck._id}, process.env.JWT_KEY, {
                expiresIn: 86400 // expires in 24 hours
            })

            return res.json({ 'success': true, 'token': token, 'filters': retArray , 'user_name': in_user});

        });
    
    });
});


// .post endpoint to add a new user to the database
router.route('/register').post((req, res) => {  

    const in_user = String(req.body.user_name);
    const in_pass = bcrypt.hashSync(String(req.body.password), 8);

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
            });

            var token = jwt.sign({id: user._id}, process.env.JWT_KEY, {
                expiresIn: 86400 // expires in 24 hours
            });

            return res.json({ 'success': true, 'user_name': in_user, 'token': token, 'filters' : [] });
                       
        }
    });
});


module.exports = router;