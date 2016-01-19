var socket = io();
var parsedUrl = window.location.href.split('/');
var id = parsedUrl[parsedUrl.length - 1];

socket.send("latestVoteData", {pollId: id})

socket.on(id, function(voteData) {
  var responseCount = $('td:not(class)').length;
  $('.total').text(voteData.total)
  for( var i = 0; i < responseCount; i++) {
    if (voteData.votes[i] !== undefined){
      $('.' + i).text(voteData.votes[i]);
    } else {
      $('.' + i).text(0);
    }
  }
})
