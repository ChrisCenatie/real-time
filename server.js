const http = require('http');
const express = require('express');
const app = express();
const _ = require('lodash');
const exphbs  = require('express-handlebars');

const port = process.env.PORT || 3000;

const server = http.createServer(app)
              .listen(port, function(){
               console.log('Listening on port ' + port + '.');
              });

const socketIo = require('socket.io');
const io = socketIo(server);

const generateId = require('./lib/generate-id');

var poll = {};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

pry = require('pryjs');

app.use(express.static('public'))

app.get("/", function(request, response){
 res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.on('message', function(channel, message){
    if(channel == "createPoll"){
      var id = generateId();
      createPoll(message, id);
      socket.emit('webAddresses', generateAddresses(id));
    }
  });
});

function createPoll(message, id){
  poll[id] = message;
}

function generateAddresses(id){
  if (port === 3000){
    return { admin: "http://localhost:3000/admin/" + id,
             voters: "http://localhost:3000/voters/" + id,
           }
  } else {
    return { admin: "https://#/admin/" + id,
             voters: "https://#/voters/" + id,
           }
  }
}

module.exports = server;
