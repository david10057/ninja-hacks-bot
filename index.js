var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var routes = require('./routes/routes.js')(app);


// Spin up the server
var server = app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
