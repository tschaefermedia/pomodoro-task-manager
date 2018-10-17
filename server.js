/* jslint node: true */
'use strict'

const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let history = require('connect-history-api-fallback');
// Require configuration file defined in app/Config.js
const config = require('./app/Config')

// Connect to database
mongoose.connect(config.DB,  { useNewUrlParser: true })
let db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

//use sessions for tracking logins
app.use(session({
    secret: 'pnqtBK9pRSGpceRR9dLw',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false
    },
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '/dist')))

// Use morgan to log request in dev mode
app.use(morgan('dev'))

app.use(bodyParser.json())

const port = config.APP_PORT || 4000

app.listen(port) // Listen on port defined in config file
app.use(history());
console.log('App listening on port ' + port)

const taskRoutes = require('./app/Routes')

//  Use routes defined in Route.js and prefix with todo
app.use('/api/', taskRoutes)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
    next()
})
// Server index.html page when request to the root is made
app.get('/', function (req, res, next) {
    res.sendfile('./dist/index.html')
})