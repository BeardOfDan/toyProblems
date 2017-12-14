// This is a toy problem
// It is from a secret gist. I have a fork at:
//   https://gist.github.com/BeardOfDan/a0db9c513bac2fbca83ec2ac0703be08

// The prompt: Make a message bus
// Minimum Specification:
//   Make a message buss object
//   Give it the methods 'subscribe' and 'publish'

class MessageBuss {
  constructor() {
    this._events = {};
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
    }
  }
}

const mb = new MessageBuss();
mb.subscribe('test', (data) => {
  console.log(JSON.stringify(data));
});

mb.publish('test', 'asdf');

mb.subscribe('other', (input) => {
  console.log(input);
});

mb.publish('other', 5);

