'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var pry = require('pryjs');
const _ = require('lodash');
const Polls = require('../lib/polls');

describe('Polls', function() {
  beforeEach(function() {
    this.polls = new Polls();
    this.data = {url: "http://localhost:3000/", pollingQuestion: "Question 1?",
                   responses: {0: "response1", 1: "response2"}};
    this.pollId = this.polls.addPoll(this.data);
  });

  describe('instantiation', function() {
    it('should instantiate an empty polls list', function() {
      var polls = new Polls();

      expect(polls.list).eql({});
    });
  });

  describe('adding a poll', function() {
    it('should add a poll to the list and return the unique id for the added poll', function() {
      expect(_.size(this.polls.list)).eql(1);
      var data = {url: "http://localhost:3000/", pollingQuestion: "Question 2?",
                     responses: {0: "response1", 1: "response3"}}
      var newId = this.polls.addPoll(data);

      expect(_.size(this.polls.list)).eql(2);
      expect(newId).not.eql(this.pollId);
    });
  });

  describe('url', function() {
    it('should return admin and voter urls as an object, given poll id', function() {
      var returnedUrls = {admin: this.data.url + "admin/" + this.pollId,
                 voters: this.data.url + "voters/" + this.pollId}

      expect(this.polls.urls(this.pollId)).eql(returnedUrls)
    });
  });

  describe('find by poll id', function() {
    it('should return poll given a poll id', function() {
      var pollData = this.polls.findById(this.pollId)

      expect(pollData.url).eql(this.data.url)
      expect(pollData.pollingQuestion).eql(this.data.pollingQuestion)
      expect(pollData.responses).eql(this.data.responses)
      expect(pollData.open).eql(true)
      expect(pollData.votes).eql({0: 0, 1: 0})
    });
  });

  describe('votes', function() {
    it('should return the vote distribution and total given the poll id', function() {
      var votingData = this.polls.voteData(this.pollId)

      expect(votingData).eql({total: 0, votes: {0: 0, 1: 0}})
    });

    it('should increment vote count by 1 to poll given a valid poll id and voteId', function() {
      var voteId = "0"
      var votingData1 = this.polls.voteData(this.pollId)

      expect(votingData1).eql({total: 0, votes: {0: 0, 1: 0}})

      this.polls.addVote(this.pollId, voteId)
      var votingData2 = this.polls.voteData(this.pollId)

      expect(votingData2).eql({total: 1, votes: {0: 1, 1: 0}})
    });

    it('should not increment vote count by 1 to poll given an invalid poll id', function() {
      var voteId = "0"
      var votingData = this.polls.voteData(this.pollId)

      expect(votingData).eql({total: 0, votes: {0: 0, 1: 0}})

      this.polls.addVote("0", voteId)

      expect(votingData).eql({total: 0, votes: {0: 0, 1: 0}})
    });

    it('should not increment vote count by 1 to poll given an invalid vote id', function() {
      var voteId = "20"
      var votingData = this.polls.voteData(this.pollId)

      expect(votingData).eql({total: 0, votes: {0: 0, 1: 0}})

      this.polls.addVote(this.pollId, voteId)

      expect(votingData).eql({total: 0, votes: {0: 0, 1: 0}})
    });
  });
});
