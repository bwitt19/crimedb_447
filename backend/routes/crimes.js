const router = require('express').Router();
let Crime = require('../models/crime.model');

// --Crimes route endpoints 

/**
 * /api/filter:
 */
router.route('/api/filter').get((req, res) => {
    console.log(`get: ${JSON.stringify(req.query)}`);

    // --Range of data filters
    if ( typeof req.query.date != 'undefined' || 
        typeof req.query.time != 'undefined' ||
        typeof req.query.long != 'undefined' ||
        typeof req.query.lat != 'undefined'
    ) {
        
        // parse into a passed range to mongo find
        Crime.find(
            req.query
            ).limit(100)
        .then(crimes => res.json(crime))
        .catch(err => res.status(400).json('Error: ' + err));
    } 
    // --Simple filters
    else if ( 
        typeof req.query.neighborhood != 'undefined' || 
        typeof req.query.crimecode != 'undefined' ||
        typeof req.query.premise != 'undefined' ||
        typeof req.query.premise != 'undefined' ||
        typeof req.query.district != 'undefined' ||
        typeof req.query.weapon != 'undefined' ||
        typeof req.query.type != 'undefined'
    ) {
        Crime.find( 
            
            req.query
            // TODO: add multiple values for one field (knife or firearm, ie checklist)

        ).limit(100)
        .then(crimes => res.json(crimes))
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
        // TODO: Return query error
    }
});
    

// .post filtering endpoint (TODO: remove)
router.route('/field/:field/value/:value').post((req, res) => {

    const field = req.params.field;
    console.log(`test ${field}`);
    const date = new Date(req.body.date);
    
    var year=date.getYear();
    console.log(`${year +1900}`);
    
    // all found entries added to crimes variable
    Crime.find({
        'date': { $lte: date }
    }).limit(5)    
    
    .then(crimes => {res.json(crimes)})
    .catch(err => res.status(400).json( 'Error: ' + err)); // TODO: Add success = true, error e_msg
});

module.exports = router;
