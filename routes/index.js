// file name:header.ejs
// student name: NirajKumar Gopani
// student number: 301159058
// date:10-21-2020

let express = require('express');
let router = express.Router();
const { redirectAuthenticated } = require('../config/auth');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function (req, res, next) {
  res.render('index', { title: 'About Me' });
});

router.get('/projects', function (req, res, next) {
  res.render('index', { title: 'Projects' });
});

router.get('/services', function (req, res, next) {
  res.render('index', { title: 'Services' });
});

router.get('/contact', function (req, res, next) {
  res.render('index', { title: 'Contact Me' });
});


router.get('/login', redirectAuthenticated, function (req, res, next) {
  res.render('index', { title: 'LogIn' });
});

module.exports = router;
