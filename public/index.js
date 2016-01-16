var socket = io();
var poll = {};
var responses = [];

$('#add-poll').on('click', function(){
  var polling = $('#poll-question');
  poll["pollingQuestion"] = polling.val().split(/[<>]/).join('');
  $('.poll').append('<h3>' + poll["pollingQuestion"] + '</h3>');
  polling.val('')
  $('.add-poll').hide();
  $('.add-responses').show();
});

$('#add-response').on('click', function() {
  $('#submit-poll').show();
  var response = $('#response');
  responses.push(response.val().split(/[<>]/).join(''));
  $('.response-list').append('<li>' + response.val().split(/[<>]/).join('') + '</li>');
  response.val('');
});

$('#submit-poll').on('click', function() {
  poll["responses"] = responses;
  socket.send('createPoll', poll);
  $('.add-responses').hide();
  this.style.visibility = "hidden";
  poll = {};
});

socket.on('webAddresses', function (addresses) {
  $('.web-addresses').show();
  $(".admin").append("Admin View: <a href='" + addresses["admin"] +"'>" + addresses["admin"] + "</a>")
  $(".voters").append("Voter View: <a href='" + addresses["voters"] +"'>" + addresses["voters"] + "</a>")
});
