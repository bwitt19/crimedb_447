const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filterSchema = new Schema({
    _id: {type: String, required: false},
    user_name: {type: String, required: true},
    filter_name: {type:String, required: true},
    lower_date: {type: Date, required: false, default: Date(1970,1,1)},
    upper_date: {type: Date, required: false, default: Date(1970,1,1)},
    description: {type: String, required: false, default: "ALL"},
    weapon: {type: String, required: false, default: "ALL"},
    district: {type: String, required: false, default: "ALL"},
    neighborhood: {type: String, required: false, default: "ALL"},
    premise: {type: String, required: false, default: "ALL"}
},
{ collection: 'saved_filters' },
{ versionKey: '1.0' });

// compile model from schema
const FilterInfoPt = mongoose.model('Filter', filterSchema, 'saved_filters');
module.exports = FilterInfoPt;