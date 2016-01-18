const _ = require('lodash');

function Poll(poll) {
  this.url             = poll.url;
  this.pollingQuestion = poll.pollingQuestion;
  this.responses       = poll.responses;
  this.open            = true;
}

module.exports = Poll;
