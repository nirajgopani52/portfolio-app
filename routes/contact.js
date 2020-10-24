// file name:header.ejs
// student name: NirajKumar Gopani
// student number: 301159058
// date:10-21-2020

var express = require('express');
var Contact = require('../models/contactList');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, function (req, res) {
    Contact.find({}).exec(function (err, contacts) {
        if (err) {
            res.send('error has occured');
        } else {
            res.render('index', { title: 'Contact List', contactList: contacts })
        }
    });
});

router.get('/:id', ensureAuthenticated, function (req, res) {
    Contact.findOne({
        _id: req.params.id
    }).exec(function (err, contact) {
        if (err) {
            res.send('error has occured');
        } else {
            res.render('index', { title: 'Contact Edit', contact: contact })
        }
    });
});

router.get('/delete/:id', function (req, res) {
    Contact.findByIdAndRemove({
        _id: req.params.id
    }, function (err, contact) {
        if (err) {
            res.send('error deleting contact');
        } else {
            res.redirect("/contact-list")
        }
    });
});

router.post('/', function (req, res) {
    var contact = new Contact();
    contact.name = req.body.firstName;
    contact.contact = req.body.contact;
    contact.emailId = req.body.emailID;
    contact.save(function (err, contact) {
        if (err) {
            res.send('error saving conatct');
        } else {
            res.redirect("/")
        }
    });
});

router.post('/:id', ensureAuthenticated, function (req, res) {
    Contact.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            contact: req.body.contact,
            emailId: req.body.emailId
        }
    }, {
        upsert: true
    }, function (err, newContact) {
        if (err) {
            res.send('error updating newContact');
        } else {
            res.redirect("/contact-list")
        }
    });
});

module.exports = router;