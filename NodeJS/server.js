var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    path = require('path'),
    layout = require('express-layout'),
    bodyParser = require('body-parser'),
    helmet = require('helmet')
    apiConfig = require('./api/config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middleware = [
    helmet(),
    layout(),
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
]
app.use(middleware);

// var userRoutes = require("./api/routes/userRoutes")
// userRoutes(app);
var stripeRoutes = require("./api/routes/stripeRoutes")
stripeRoutes(app);

app.use((req, res, next) => {
    res.status(404).send("Page not found!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error!');
});

app.listen(port);

console.log('RESTful API server started on : ' + port);
