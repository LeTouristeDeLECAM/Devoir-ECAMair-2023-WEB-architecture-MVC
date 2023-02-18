const hostname = '127.0.0.1';

// Import express
let express = require('express');
let flightRouter = require('./routes/flightRoutes');

// Initialize the app
let app = express();
let parser = require('body-parser');
app.use(express.urlencoded({ extended: true }));

let session = require('express-session');

app.use(session({
    secret: 'my secret',
    resave: false , 
    saveUninitialized : false
})); 


app.use(express.static(__dirname + '/public'));
app.use('/', flightRouter);
  

// Setup server port
let port = 3000;
// Launch app to listen to specified port


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





/*
app.listen(port, function () {
  //console.log(`Server running at http://${hostname}:${port}/`);
console.log("Server running on port" + port);
});
*/


/*
const http = require('http');


//--------------------------

// Import express
let express = require('express');
let flightRoutes = require('./routes/flightRoutes');

// Initialize the app
let app = express();
let parser = require('body-parser');
app.use(express.urlencoded({ extended: true }));

let session = require('express-session');

app.use(session({
    secret: 'my secret',
    resave: false , 
    saveUninitialized : false
})); 


app.use(express.static(__dirname + '/public'));
app.use('/', flightRoutes);
  

//--------------------------

const hostname = '127.0.0.1';
const port = 3000;
const Routes = require("./routes/flightRoutes")

//const express = require('express'); // peut-etre à suprimer 

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

//server.route(Routes);

//app.use(express.static(__dirname + '/public'));
//app.use('/', flightRoutes);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


*/