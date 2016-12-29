'use strict';

// App ID for the skill.
var APP_ID = undefined;

// Array containing interview tips.
var TIPS = [
  'Remember to bring a notebook, a pen, resumes, references, a portfolio, and code samples to your interview.',
  'Do not forget to turn off your phone.',
  'Make sure there is nothing between your teeth.',
  'Maintain eye contact and give a firm handshake.',
  'Give honest, direct answers. Do not ramble.',
  'Listen carefully and welcome hard questions with a smile.',
  'If you do not understand a question, politely ask for clarification.',
  'Arrive 10 to 15 minutes early.'
];

// Require the AlexaSkill prototype and helper functions.
var AlexaSkill = require('./AlexaSkill');

// interviewTips is a child of AlexaSkill via inheritance.
var Tip = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Tip.prototype = Object.create(AlexaSkill.prototype);
Tip.prototype.constructor = Tip;

Tip.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log('onSessionStarted requestId: ' + sessionStartedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any initialization logic goes here
};

Tip.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  handleNewTipRequest(response);
};

// Overridden to show that a subclass can override this function to teardown session state.
Tip.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log('onSessionEnded requestId: ' + sessionEndedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any cleanup logic goes here
};

Tip.prototype.intentHandlers = {
  'GetNewTipIntent': function (intent, session, response) {
    handleNewTipRequest(response);
  },

  'AMAZON.HelpIntent': function (intent, session, response) {
    response.ask('You can say tell me a resume tip, or, you can say exit... What can I help you with?", "What can I help you with?');
  },

  'AMAZON.StopIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  },

  'AMAZON.CancelIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  }
};

// Gets a random new tip from the list and returns to the user.
function handleNewTipRequest(response) {

  // Get a random interview tip from the interview tips list
  var tipIndex = Math.floor(Math.random() * TIPS.length);
  var randomTip = TIPS[tipIndex];

  // Create speech output
  var speechOutput = 'Here is your tip: ' + randomTip;
  var cardTitle = 'Your Interview Tip';
  response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the interviewTips skill.
  var tip = new Tip();
  tip.execute(event, context);
};
