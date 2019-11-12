const router = require('express').Router();
let Crime = require('../models/crime.model');


const MAX_LIMIT = 10000;         // define a max limit of returned crime objects
const DEFAULT_LIMIT = 5000;

/**
 * /crimes/api/filter
 */  
router.route('/filter').get((req, res) => {
    var lim = DEFAULT_LIMIT; 
    var mongo_query = {};       // query parameters go here after being parsed
    
    if ( typeof req.query.limit == 'undefined') {
        lim = DEFAULT_LIMIT;
    } 
    else {
        if ( req.query.limit > MAX_LIMIT) {
            console.log("LIMIT EXCEEDS MAX");
            lim = MAX_LIMIT;
        } 
        else {
            lim = parseInt(req.query.limit);
        }
        delete req.query['limit'];     // remove for interference with actual query
    }

    // --Direct to query, no parsing needed   
    if (
        typeof req.query.date != 'undefined' ||
        typeof req.query.neighborhood != 'undefined' || 
        typeof req.query.crimecode != 'undefined' ||
        typeof req.query.premise != 'undefined' ||
        typeof req.query.district != 'undefined' ||
        typeof req.query.weapon != 'undefined' ||
        typeof req.query.type != 'undefined'
        ) {

        mongo_query = req.query;
    } 

    // -- Date parsing: (overwrites single date)
    if (typeof req.query.lower_date != 'undefined' && typeof req.query.upper_date != 'undefined') {
        mongo_query.date = { $gte: new Date(req.query.lower_date), $lte: new Date(req.query.upper_date) };
        delete mongo_query.lower_date;
        delete mongo_query.upper_date;
    }
    else if (typeof req.query.lower_date != 'undefined') {
        mongo_query.date = { $gte: new Date(req.query.lower_date) };
        delete mongo_query.lower_date;
    } 
    else if (typeof req.query.upper_date != 'undefined') {
        mongo_query.date = { $lte: new Date(req.query.upper_date) }; 
        delete mongo_query.upper_date;
    }
    
    // --Execute query
    if (typeof mongo_query != 'undefined') {
        // --Find (query)
        Crime.find(
            mongo_query
            ).limit(lim)
            .then(crimes => res.json({success: true, count:Object.keys(crimes).length, crimes} ) )
            .catch(err => res.status(400).json({ success: false, parsed_query: mongo_query, e_msg: err}));
            
    } else {
        // --Find All
        Crime.find().limit(lim)
        .then(crimes => res.json({success: true, count: Object.keys(crimes).length, crimes}))
        .catch(err => res.status(400).json({ success: false, e_msg: err}));

    }
});

// --Testing route, for sending mongo queries directly
router.route('/test').get( (req,res) => {

    Crime.find(
        req.query
        //{"weapon": { $in: ["KNIFE", "HANDS"]}}
        //{"date": {$lte: new Date("2017")}}
    ).limit(20)
    .then(crimes => {res.json(crimes)})
    .catch(err => res.status(400).json( {success: false, e_msg: err, query: req.query} ));
});

module.exports = router;
