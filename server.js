/**file name:server.js
student name: Nirajumar Gopani
student number: 301159058
date:10-11-2020
*/

let app = require("./app");
let debug = require("debug")("comp308-w2019-lesson3b:server");
let http = require("http");

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

server.listen(port);

server.on("listening", onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("addr, bind");
  debug("Listening on " + bind);
}
