'use strict';

var expect = require('chai').expect;
var index = require('../src/index');
const context = require('aws-lambda-mock-context');
const ctx = context();

describe('Testing a session with the AboutIntent', function() {
  var speechResponse = null;
  var speechError = null;
  before(function(done){
    index.handler({
      'session': {
        'sessionId': 'SessionId.ea0b0f0b-c142-46f5-bb75-73a3caa51668',
        'application': {
          'applicationId': 'amzn1.ask.skill.189d2caf-36de-483e-838a-954b023286c6'
        },
        'attributes': {},
        'user': {
          'userId': 'amzn1.ask.account.AF2DLWCGR52R4WHD52ZBZLMNTILSTRNIZ6HDX54MPV2RMPI7CDIYU56NJEFYQ77FDP3BCVHXJYOF5V3S6NZQRKFAMLYIVMG325KEDVUZCVXR7L6PXEDPZ5S7BXHK52RHMOSV3Z7SMHKXQHRAZEQ3PX236PS4G4AQ2ERFYR7I7NV4VO5QAKNFICSWPN35UTSBQQUHCWIN343N2KI'
        },
        'new': true
      },
      'request': {
        'type': 'IntentRequest',
        'requestId': 'EdwRequestId.5a58729c-cc5c-4c9b-b6b8-8ff5efa80e9b',
        'locale': 'en-US',
        'timestamp': '2017-01-12T19:07:48Z',
        'intent': {
          'name': 'GetNewTipIntent',
          'slots': {}
        }
      },
      'version': '1.0'
    }, ctx);
    ctx.Promise
    .then(resp => { speechResponse = resp; done(); })
    .catch(err => { speechError = err; done(); });
  });
  describe('The response is structurally correct for Alexa Speech Services', function() {
    it('should not have errored',function() {
      expect(speechError).to.be.null;
    });
    it('should have a version', function() {
      expect(speechResponse.version).not.to.be.null;
    });
    it('should have a speechlet response', function() {
      expect(speechResponse.response).not.to.be.null;
    });
    it('should have a spoken response', () => {
      expect(speechResponse.response.outputSpeech).not.to.be.null;
    });
    it('should end the alexa session', function() {
      expect(speechResponse.response.shouldEndSession).not.to.be.null;
      expect(speechResponse.response.shouldEndSession).to.be.true;
    });
  });
});
