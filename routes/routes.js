var path = require('path')
var request = require('request')



var appRouter = function(app){


// Index route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,'form.html'));
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === '<sectret_verifier>') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
            sendTextMessage(sender,"The sender is: " + sender)
        }
    }
    res.sendStatus(200)
})


app.get('/users/:user/:message', function (req, res) {
	var username = req.params.user;
	var message = req.params.message;
    sendTextMessage(username, message);
    res.send("")
})

app.get('/sendPoint', function (req, res) {

    var sender = req.query.sender;
    var message = req.query.message;

    sendTextMessage(sender,message);

})


function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


var token = "<secret token>"


}


module.exports = appRouter;
