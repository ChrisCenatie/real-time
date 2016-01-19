const Poll = require('./poll')
const generateId = require('./generate-id');
const _ = require('lodash');

function Polls(){
  this.list = {};
}

Polls.prototype.addPoll = function (pollData) {
  var id = generateId();
  this.list[id] = new Poll(pollData);
  return id;
};

Polls.prototype.urls = function (id) {
  return { admin: this.list[id].url + "admin/" + id,
          voters: this.list[id].url + "voters/" + id }
};

Polls.prototype.findById = function (id) {
  return this.list[id];
};

Polls.prototype.voteData = function (id) {
  var poll = this.findById(id);
  var total = _.sum(_.values(poll.votes));
  return {total: total, votes: poll.votes}
};

Polls.prototype.addVote = function (pollId, voteId) {
  if(this.findById(pollId)) {
    var poll = this.findById(pollId)
    poll.addVote(voteId);
  }
};

Polls.prototype.closePoll = function (id) {
  if(this.findById(id)) {
    this.findById(id).open = false;
  }
};

Polls.prototype.sharePoll = function (id) {
  if(this.findById(id)) {
    this.findById(id).share = true;
  }
};

module.exports = Polls;
