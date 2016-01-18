'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const Polls = require('../lib/polls');

// pry = require('pryjs');

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
    it('should return a unique id when the poll is added', function() {
      var data = {url: "http://localhost:3000/", pollingQuestion: "Question 1?",
                     responses: {0: "response1", 1: "response2"}}
      expect(this.polls.addPoll(data)).not.eql(this.polls.addPoll(data));
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
    it('should return poll attributes given a poll id', function() {
      var pollData = this.polls.findById(this.pollId)
      this.data["open"] = true;

      expect(pollData).eql(this.data)
    });
  });
});
