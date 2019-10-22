const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const crimeSchema = new Schema({
    _id: { type: String, required: true},
    neighborhood: { type: String, required: true },
    crimecode: { type: String, required: true },
    premise: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, default : () => new Date() },
    district: { type: String, required: true },
    weapon: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    type: { type: String, required: true },
},
{ collection: 'crime_data' });

// compile model from schema
const CrimeDataPt = mongoose.model('Crime', crimeSchema, 'crime_data');

module.exports = CrimeDataPt;


