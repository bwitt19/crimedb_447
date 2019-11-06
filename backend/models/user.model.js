const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {type: String, required: false},
    user_name: {type: String, required: true},
    password: {type: String, required: true}
},
{ collection: 'account_info' },
{ versionKey: '1.0' });

// compile model from schema
const UserInfoPt = mongoose.model('User', userSchema, 'account_info');
module.exports = UserInfoPt;