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

module.exports = Polls;
