// Name: Gopani Niraj
// Student Number: 301159058
let app = require('./app');
let debug = require('debug')('comp308-w2019-lesson3b:server');
let http = require('http');

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);

server.on('listening', onListening);
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log("RUNNING.....")
  debug('Listening on ' + bind);
}
