// file name:header.ejs
// student name: NirajKumar Gopani
// student number: 301159058
// date:10-21-2020

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create contact schema for handle contact list with database
var ContactSchema = new Schema({
    name: { type: String, unique: true },
    contact: Number,
    emailId: String
});

module.exports = mongoose.model('Contact', ContactSchema);