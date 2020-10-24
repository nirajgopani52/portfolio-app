// file name:header.ejs
// student name: NirajKumar Gopani
// student number: 301159058
// date:10-21-2020

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//THIS IS LOGIN USER SCHEMA
var UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    email: String
});

module.exports = mongoose.model('User', UserSchema);