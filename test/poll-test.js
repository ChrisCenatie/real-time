'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var pry = require('pryjs');
const Poll = require('../lib/poll');

describe('Poll', function() {
  beforeEach(function() {
    this.data = {url: "http://localhost:3000/", pollingQuestion: "Question 1?",
                   responses: {0: "response1", 1: "response2"}};

    this.poll = new Poll(this.data);
  });

  describe('instantiation', function() {
    it('should instantiate with url, pollingQuestion, responses, and open status of true', function() {
      expect(this.poll.url).eql(this.data.url);
      expect(this.poll.pollingQuestion).eql(this.data.pollingQuestion);
      expect(this.poll.responses).eql(this.data.responses);
      expect(this.poll.open).eql(true);
      expect(this.poll.votes).eql({0: 0, 1: 0})
    });
  });

  describe('votes', function() {
    it('should increment vote count by 1 given a valid voteId and return votes count object', function() {
      expect(this.poll.votes).eql({0: 0, 1: 0})
      var vote1 = "0";
      var vote2 = "1";

      expect(this.poll.addVote(vote1)).eql({0: 1, 1: 0});
      expect(this.poll.addVote(vote2)).eql({0: 1, 1: 1});
    });

    it('should not increment vote count by 1 given a wrong voteId and return votes count object', function() {
      expect(this.poll.votes).eql({0: 0, 1: 0})
      var vote1 = "10";

      expect(this.poll.addVote(vote1)).eql({0: 0, 1: 0});
    });
  });
});
