var socket = io();
var parsedUrl = window.location.href.split('/');
var id = parsedUrl[parsedUrl.length - 1];
var vote = {pollId: id};

socket.send("latestVoteData", {pollId: id});

$('button').on('click', function() {
  var responseTitle = this.innerHTML;
  vote["voteId"] = this.className;
  $('.responses').hide();
  $('.submitted').show();
  $('h3').append("Your vote <em>'" + responseTitle +
                         "'</em> has been submitted!");
  socket.send("voteResponse", vote)
});

socket.on(id, function(voteData) {
  var responseCount = $('td:not(class)').length;
  $('.total').text(`Total Votes: ` + voteData.total)
  for( var i = 0; i < responseCount; i++) {
    if (voteData.votes[i] !== undefined){
      $('.stats' + i).text(voteData.votes[i]);
    } else {
      $('.stats' + i).text(0);
    }
  }
});

socket.on("close-" + vote.pollId, function(message) {
  if(message.open === false){
    $('.well').hide();
    $('.poll-closed').show();
  }
});
