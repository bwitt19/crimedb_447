const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {type: String, required: true},
    user: {type: String, required: true},
    pass: {type: String, required: true},
    filters: {type: Array, default: []}
},
{ collection: 'account_info' });

// compile model from schema
const UserInfoPt = mongoose.model('User', userSchema, 'account_info');
module.exports = UserInfoPt;