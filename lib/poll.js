const _ = require('lodash');

function Poll(poll) {
  this.url             = poll.url;
  this.pollingQuestion = poll.pollingQuestion;
  this.responses       = poll.responses;
  this.open            = true;
  this.votes           = initialVoteCount(poll.responses);
  this.share           = false;
}

Poll.prototype.addVote = function (voteId) {
  if(this.votes[voteId] !== undefined) {
    this.votes[voteId]++;
  }
  return this.votes;
};

function initialVoteCount (responses) {
  var count = {};
  _.forEach(responses, function(value, key){
    count[key] = 0;
  });
  return count;
};

module.exports = Poll;
