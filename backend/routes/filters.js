const router = require('express').Router();
const Filter = require('../models/filter.model');


// .post endpoint to add a new filter to the database
router.route('/api/user_filter').post((req, res) => {  
  
    const in_filter_name = new String(req.body.user_name);
    const in_user = new String(req.body.user_name);
  
    // Check to see if the filter with that name already exists
    Filter.findOne({ 'user_name': { in_user }, 'filter_name': { in_filter_name } })
    .then(filterCheck => {
        
        // If filter found
        if(filterCheck) {
            return res.status(400).json({ success: false, e_msg: "Filter with that name already exists." });
        } 
        
        // If the filter name is not in use, create the filter
        else {
                        
            // Create the new filter Schema
            var filter = new Filter({
                //_id: mongoose.Types.ObjectId(),
                user_name: in_user, 
                filter_name: in_filter_name,
                lower_date: String(req.body.lower_date),
                upper_date: String(req.body.upper_date),
                description: String(req.body.description),
                weapon: String(req.body.weapon),
                district: String(req.body.district),
                neighborhood: String(req.body.neighborhood),
                premise: String(req.body.premise)
            })            
            
            // Save it to the database
            filter.save(function (err, retUser) {
                if (err) return console.error(err);
        
                console.log(user_name+" added "+filter.filter_name+" to their filters collection");
            })
            return res.json({ success: true });
                       
        }
    });
});


// .get endpoint to get the specified filter for a user
router.route('/api/get_user_filter').get((req, res) => {

    const in_user = new String(req.body.user_name);
    const in_filter_name = new String(req.body.filter_name)

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


// .put endpoint to update the filters for a user
router.route('/api/user_filter').put((req, res) => {
    
    const in_old_filter_name = new Array(req.body.filters);
    const in_user = new String(req.body.user_name);

    const in_filter = { user_name: in_user, 
                        filter_name: String(req.body.new_filter_name),
                        lower_date: String(req.body.lower_date),
                        upper_date: String(req.body.upper_date),
                        description: String(req.body.description),
                        weapon: String(req.body.weapon),
                        district: String(req.body.district),
                        neighborhood: String(req.body.neighborhood),
                        premise: String(req.body.premise)
                      };

    // Find the current user and update their filters array
    Filter.findOneAndUpdate({ 'user_name': { in_user }, 'filter_name': { in_old_filter_name }}, { in_filter } )
    .then(filterCheck => {
        
        // If no user found
        if(!filterCheck) {
            return res.status(400).json({ success: false, e_msg: "Error in updating filter" });
        } 

        // Return that the change was successful
        return res.json({ success: true });

    });
    
});


module.exports = router;