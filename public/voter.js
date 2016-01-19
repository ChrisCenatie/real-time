var socket = io();
var parsedUrl = window.location.href.split('/');
var vote = {pollId: parsedUrl[parsedUrl.length - 1]};

$('button').on('click', function() {
  var responseTitle = this.innerHTML;
  vote["voteId"] = this.className;
  $('.responses').hide();
  $('.submitted').show();
  $('h3').append("Your vote <em>'" + responseTitle +
                         "'</em> has been submitted!");
  socket.send("voteResponse", vote)
});

socket.on("close-" + vote.pollId, function(message) {
  if(message.open === false){
    $('.well').hide();
    $('.poll-closed').show();
  }
});
