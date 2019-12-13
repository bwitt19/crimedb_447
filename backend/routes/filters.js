const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.set('useFindAndModify', false);
const Filter = require('../models/filter.model');


// .post endpoint to add a new filter to the database
router.route('/user_filter').post((req, res) => {  
  
    const in_filter_name = new String(req.body.filter_name);
    const in_user = new String(req.body.user_name);

    // Make sure the supplied user is authenticated
    jwt.verify(String(req.body.token), process.env.JWT_KEY, function(err, decoded) {

        // If the user is not authenticated return an error
        if(err) {
            console.log(err);
            return res.status(400).json({ 'success': false, 'e_msg': 'Failed to authenticate' });
        }

        // Check to see if the filter with that name and user already exists
        Filter.findOne({ 'user_name': in_user, 'filter_name': in_filter_name })
        .then(filterCheck => {
        
            // If the user already has a filter with that name
            if(filterCheck) 
                return res.status(400).json({ 'success': false, 'e_msg': "Filter with that name already exists." });
              
            // If the filter name is not in use, create the filter
            else {
                        
                console.log(String(req.body.type));
                // Create the new filter Schema doing input validation on each input
                var filter = new Filter({
                    _id: mongoose.Types.ObjectId(),
                    user_name: in_user, 
                    filter_name: in_filter_name,
                    lower_date: (String(req.body.lower_date).length != 0 ? String(req.body.lower_date) : "1970-01-01T00:00:00Z"),
                    upper_date: (String(req.body.upper_date).length != 0 ? String(req.body.upper_date) : "1970-01-01T00:00:00Z"),
                    type: (String(req.body.type).length != 0 ? String(req.body.type) : ""),
                    weapon: (String(req.body.weapon).length != 0 ? String(req.body.weapon) : ""),
                    district: (String(req.body.district).length != 0 ? String(req.body.district) : ""),
                    neighborhood: (String(req.body.neighborhood).length != 0 ? String(req.body.neighborhood) : ""),
                    premise: (String(req.body.premise).length != 0 ? String(req.body.premise) : "")                      
                })            
            
                // Save it to the database
                filter.save(function (err, retUser) {
                    if (err) 
                        return console.error(err);
        
                    console.log(in_user+" added "+in_filter_name+" to their filters collection");
                })
                return res.json({ 'success': true });
                       
            }
        });

    });

        
    
});


// .put endpoint to update the filters for a user
router.route('/user_filter').put((req, res) => {
    
    const in_old_filter_name = new String(req.body.filter_name);
    const in_user = new String(req.body.user_name);

    // Create the new filter doing input validation on each input
    const in_filter = { user_name: in_user, 
                        filter_name: String(req.body.new_filter_name).length != 0 ? String(req.body.new_filter_name) : in_old_filter_name,
                        lower_date: (String(req.body.lower_date).length != 0 ? String(req.body.lower_date) : "1970-01-01T00:00:00Z"),
                        upper_date: (String(req.body.upper_date).length != 0 ? String(req.body.lower_date) : "1970-01-01T00:00:00Z"),
                        type: (String(req.body.type).length != 0 ? String(req.body.type) : ""),
                        weapon: (String(req.body.weapon).length != 0 ? String(req.body.weapon) : ""),
                        district: (String(req.body.district).length != 0 ? String(req.body.district) : ""),
                        neighborhood: (String(req.body.neighborhood).length != 0 ? String(req.body.neighborhood) : ""),
                        premise: (String(req.body.premise).length != 0 ? String(req.body.premise) : "")
                      };

    // Make sure the supplied user is authenticated
    jwt.verify(String(req.body.token), process.env.JWT_KEY, function(err, decoded) {

        // If the user is not authenticated return an error
        if(err) {
            console.log(err);
            return res.status(400).json({ 'success': false, 'e_msg': 'Failed to authenticate' });
        }

        // Find the current user and update their filters array
        Filter.findOneAndUpdate({ 'user_name': in_user, 'filter_name': in_old_filter_name }, in_filter )
        .then(filterCheck => {
        
            // If no user found
            if(!filterCheck) 
                return res.status(400).json({ success: false, e_msg: "Error in updating filter" });
        

            // Return that the change was successful
            return res.json({ success: true });
        
        });
    });
    
});


// .delete endpoint to delete a filter from the database
router.route('/user_filter').delete((req, res) => {  
  
    const in_filter_name = new String(req.body.filter_name);
    const in_user = new String(req.body.user_name);
  
    // Make sure the supplied user is authenticated
    jwt.verify(String(req.body.token), process.env.JWT_KEY, function(err, decoded) {

        // If the user is not authenticated return an error
        if(err) {
            console.log(err);
            return res.status(400).json({ 'success': false, 'e_msg': 'Failed to authenticate' });
        }

        // Check to see if the filter with that name already exists
        Filter.deleteOne({ 'user_name': in_user, 'filter_name': in_filter_name },
        function (err) {

            // If filter was not deleted
            if(err) 
                return res.status(400).json({ success: false, e_msg: "Filter could not be found" });
                 
            // If the filter was deleted
            else 
                return res.json({ success: true });         
        
        });
    });
});


// .get endpoint to get the specified filter for a user
router.route('/user_filter').get((req, res) => {

    const in_user = new String(req.body.user_name);
    const in_filter_name = new String(req.body.filter_name)

    // Make sure the supplied user is authenticated
    jwt.verify(String(req.body.token), process.env.JWT_KEY, function(err, decoded) {

        // If the user is not authenticated return an error
        if(err) {
            console.log(err);
            return res.status(400).json({ 'success': false, 'e_msg': 'Failed to authenticate' });
        }

        // Find the specified filter
        Filter.findOne({ 'user_name': { in_user }, 'filter_name': {in_filter_name} })
        .then(filterCheck => {
        
            // If no filter was found with that given name
            if(!filterCheck) {
                return res.status(400).json({ success: false, e_msg: "No filter with name found" })
            }

            // If a filter with the given name for the user is found return it
            return res.json({ success: true, filter: filterCheck});

        });
    });
});


module.exports = router;