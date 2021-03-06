/**file name:server.js
student name: Nirajumar Gopani
student number: 301159058
date:10-11-2020
*/
//Name: Niraj gopani
var express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , engine = require('ejs-locals')
  , session = require('express-session')
  , passport = require('passport') //for authentication
  , app = express()
  , flash = require('connect-flash')
  require("dotenv").config();
  require('./config/passport')(passport);

const { redirectAuthenticated } = require("./config/auth")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const url = 'mongodb+srv://niraj11:niraj111@mycluster.w4i8l.mongodb.net/portfolio?retryWrites=true&w=majority'
console.log("URL ",process.env.MONGODB_URL)
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}) //connection mongoDB with project
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})


app.engine('ejs', engine);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //add view part in express
app.set('view engine', 'ejs'); // for view part used ejs template
app.use(express.static('public')) //public directory connect
app.use(express.json());
app.use(flash());
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
    successRedirect: '/contact-list', // alow user to access contact list
    failureRedirect: '/login', //user is asked to login again
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

