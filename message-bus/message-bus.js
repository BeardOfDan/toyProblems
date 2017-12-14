// This is a toy problem
// It is from a secret gist. I have a fork at:
//   https://gist.github.com/BeardOfDan/a0db9c513bac2fbca83ec2ac0703be08

// The prompt: Make a message bus
// Minimum Specification:
//   Make a message bus object
//   Give it the methods 'subscribe' and 'publish'

// Problem extension #1
//   Add the concept of channels.
//     I.e., when you subscribe or publish,
//       you can optionally designate a "channel" on which your message is received/sent.
//       Unless you subscribe to that channel, you don't receive messages publishes on that channel.

// Problem extension #2
//   Add topic wildcarding.
//     This allows subscribers to receive all messages that partially-match on a pattern.


class MessageBus {
  constructor() {
    this._events = {}; // solo events
    this._channels = {}; // channels of events
  }

  subscribe(event, action) {
    if (this._events[event]) {
      this._events[event].push(action);
    } else {
      this._events[event] = [action];
    }
  }

  publish(event, data) {
    const actions = this._events[event];
    if (actions) {
      for (let i = 0; i < actions.length; i++) {
        actions[i](data);
      }
    } else {
      console.log(`No subscriptions for the event '${event}' were found!`);
      return -1; // signify issue
    }
  }

  // Ex. info = {
  //   channel: 'commerce',
  //   topic: 'order_complete',
  //   callback: function(payload) {
  //     // do something with the payload
  //   }
  // });
  subscribeToChannel(info) {
    const thisChannel = this._channels[info.channel];
    if (thisChannel) { // if the channel exists
      const thisEvent = thisChannel._events[info.topic];
      if (thisEvent) { // add the function
        thisEvent.push(info.callback);
      } else { // add an array and give it the function
        thisChannel._events[info.topic] = [info.callback];
      }
    } else { // add the channel, give it an events array, and give that array the function
      this._channels[info.channel] = {};
      this._channels[info.channel]._events = [];
      this._channels[info.channel]._events[info.topic] = [info.callback];
    }
  }


  // Ex. info = {
  //   channel: 'commerce',
  //   topic: 'order_started',
  //   data: {
  //     user_id: '4273984723428'
  //   }
  // });
  publishToChannel(info) {
    const thisChannel = this._channels[info.channel];
    if (thisChannel) {
      const thisEvent = thisChannel._events[info.topic];
      if (thisEvent) { // execute each of the callback subscribed functions with the data
        for (let i = 0; i < thisEvent.length; i++) {
          thisEvent[i](info.data);
        }
      } else {
        console.log(`The event '${info.topic}' could not be found in the channel '${info.channel}'!`);
        return -2; // signify issue
      }
    } else {
      console.log(`The channel '${info.channel}' could not be found!`);
      return -1; // signify issue
    }
  }

}

// ===========================
// === Initial Tests START ===
// ===========================

const mb = new MessageBus();

console.log('Initial Test 1...');
mb.subscribe('test', (data) => {
  console.log(JSON.stringify(data, undefined, 2));
});

mb.publish('test', 'asdf');

console.log('\n\nInitial Test 2...');
mb.subscribe('other', (input) => {
  console.log(input * 5);
});

mb.publish('other', 5);

// =========================
// === Initial Tests END ===
// =========================

// ========================================
// === Problem Extension #1 Tests START ===
// ========================================

console.log('\n\nExtension 1 Test 1 ...');
mb.subscribeToChannel({
  'channel': 'testing',
  'topic': 'a test',
  'callback': function (data) {
    console.log(JSON.stringify(data, undefined, 2));
  }
});

mb.publishToChannel({
  'channel': 'testing',
  'topic': 'a test',
  'data': { 'test': 'asdf' }
});

// ======================================
// === Problem Extension #1 Tests END ===
// ======================================

// ========================================
// === Problem Extension #1 Tests START ===
// ========================================



// ======================================
// === Problem Extension #1 Tests END ===
// ======================================

