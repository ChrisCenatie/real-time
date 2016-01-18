var socket = io();
var parsedUrl = window.location.href.split('/');
var vote = {pollId: parsedUrl[parsedUrl.length - 1]};
console.log(vote);

$('button').on('click', function() {
  var responseTitle = this.innerHTML;
  vote["voteId"] = this.className;
  console.log(vote);
  $('.responses').hide();
  $('.submitted').show();
  $('h3').append("Your vote <em>'" + responseTitle +
                         "'</em> has been submitted!");
  // socket.send("voteResponse", vote)
})
