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

var polls = {};
var votes = {};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

pry = require('pryjs');

app.use(express.static('public'))

app.get("/", function(request, response){
 res.sendFile(__dirname + '/public/index.html');
});

app.get('/voters/:id', (request, response) => {
  var id = request.params.id
  var pollingQuestion = polls[request.params.id].pollingQuestion;
  var responses = polls[request.params.id].responses;

  response.render('voter', {id, pollingQuestion, responses})
});

app.get('/admin/:id', (request, response) => {
  var id = request.params.id
  var pollingQuestion = polls[request.params.id].pollingQuestion;
  var responses = polls[request.params.id].responses;
  var responseCount = voteCountByResponse(id);


  response.render('admin', {id, pollingQuestion, responses})
});


io.on('connection', function (socket) {
  socket.on('message', function(channel, message){
    if(channel == "createPoll"){
      var id = generateId();
      createPoll(message, id);
      socket.emit('webAddresses', generateAddresses(id));
    }else if (channel == "voteResponse") {
      // console.log(polls);
      // console.log(votes);
      var pollId = message.id;
      var voterId = socket.id;
      if(votes[pollId] === undefined){
        var vote = {};
        vote[socket.id] = message.response;
        votes[pollId] = vote;
      } else {
        votes[pollId][socket.id] = message.response;
      }
      // console.log(votes);
      // console.log(voteCountByResponse(pollId));
      // console.log(voteCountByResponseIndex(pollId));
      // console.log(pollId)
      io.sockets.emit(pollId, voteCountByResponseIndex(pollId));
    }
  });
});

function createPoll(message, id){
  polls[id] = message;
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

function voteCountByResponse(id) {
  return _.countBy(votes[id], function(response, voter){
    return response;
  });
}

function voteCountByResponseIndex(id) {
  var responseCount = voteCountByResponse(id);
  var responses = polls[id].responses;
  var responseCountByIndex = {};
  _.forEach(responseCount, function(count, response){
    responseCountByIndex[responses.indexOf(response)] = count;
  });
  return responseCountByIndex;
}


module.exports = server;
