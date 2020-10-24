/**file name:server.js
student name: Nirajumar Gopani
student number: 301159058
date:10-11-2020
*/
//File: App.js
//Name: Niraj gopani
var express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , engine = require('ejs-locals')
  , session = require('express-session')
  , passport = require('passport') //for authentication
  , app = express();
  
  require('./config/passport')(passport);

const { redirectAuthenticated } = require("./config/auth")

app.engine('ejs', engine);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //add view part in express
app.set('view engine', 'ejs'); // for view part used ejs template
app.use(express.static('public')) //public directory connect
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //public directory connect
app.use(express.static(path.join(__dirname, 'node_modules'))); //node_modules directory connect
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require('./routes/index.js'))
app.use("/contact-list", require('./routes/contact.js')) //handle bussiness contact list routes

app.post('/login', redirectAuthenticated, function(req, res, next) {
  console.log("LOGIN IN")
  passport.authenticate('local', {
    successRedirect: '/contact-list',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)
});


app.use(function(err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page....
  res.status(err.status || 500);
  res.render('error');
});

const port = "3000"
/**
 * Get port from environment and store in Express.
 */
app.set("port", "3000");

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

server.listen(port);

server.on("listening", () => {
  console.log("SERVER RUNNING...");
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
});

const url = 'mongodb://localhost:27017/portfolio-data'

mongoose.connect(url,{useNewUrlParser:true}) //connection mongoDB with project
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})