var socket = io();
var vote = {};

$('button').on('click', function() {
  vote["id"] = this.parentNode.parentNode.id;
  vote["response"] = this.innerHTML;
  $('.responses').hide();
  $('.submitted').show();
  $('h3').append("Your vote <em>'" + vote["response"] +
                         "'</em> has been submitted!");
  socket.send("voteResponse", vote)
})
