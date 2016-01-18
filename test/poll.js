'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var pry = require('pryjs');
const Poll = require('../lib/poll');

describe('Polls', function() {
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
    });
  });
});
