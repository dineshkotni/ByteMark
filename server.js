// server.js
const express = require('express');
const app = express();
const path = require('path');
var http = require('http');
// Run the app by serving the static files
app.use(express.static(__dirname + ''));
// Start the app by listening on the default
// Server
console.log("Server started at 9292");
app.listen(process.env.PORT || 9292);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));

});

