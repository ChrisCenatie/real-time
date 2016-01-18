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

const Polls = require('./lib/polls');

var polls = new Polls();
var votes = {};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

pry = require('pryjs');

app.use(express.static('public'))

app.get("/", function(request, response){
 res.sendFile(__dirname + '/public/index.html');
});

app.get('/voters/:id', (request, response) => {
  var id = request.params.id;
  // render this only if polls.findById.active is true
  response.render('voter', polls.findById(id));
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
      var id = polls.addPoll(message);
      socket.emit('webAddresses', polls.urls(id));
    }//else if (channel == "voteResponse") {
      // console.log(polls);
      // console.log(votes);
    //   var pollId = message.id;
    //   var voterId = socket.id;
    //   if(votes[pollId] === undefined){
    //     var vote = {};
    //     vote[socket.id] = message.response;
    //     votes[pollId] = vote;
    //   } else {
    //     votes[pollId][socket.id] = message.response;
    //   }
    //   // console.log(votes);
    //   // console.log(voteCountByResponse(pollId));
    //   // console.log(voteCountByResponseIndex(pollId));
    //   // console.log(pollId)
    //   io.sockets.emit(pollId, voteCountByResponseIndex(pollId));
    // }
  });
});


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
