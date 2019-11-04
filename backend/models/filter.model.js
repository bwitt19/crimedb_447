const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filterSchema = new Schema({
    //_id: {type: String, required: false},
    user_name: {type: String, required: true},
    filter_name: {type:String, required: true},
    lower_date: {type: Date, required: false},
    upper_date: {type: Date, required: false},
    description: {type: String, required: false},
    weapon: {type: String, required: false},
    district: {type: String, required: false},
    neighborhood: {type: String, required: false},
    premise: {type: String, required: false}
},
{ collection: 'saved_filters' },
{ versionKey: '1.0' });

// compile model from schema
const FilterInfoPt = mongoose.model('Filter', filterSchema, 'saved_filters');
module.exports = FilterInfoPt;