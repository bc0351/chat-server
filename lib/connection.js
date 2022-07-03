'use strict';
const dataModules = require('../src/models');

const messages = dataModules.messages;
const users = dataModules.users;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    this.socket.on('getMessages', () => this.getMessages());

    socket.on('message', (value) => this.handleMessage(value));

    //trigger disconnect on socket disconnect
    socket.on('disconnect', () => this.disconnect());

    //trigger disconnect on error
    socket.on('connect_error', (err) => {
      console.log(`ERROR: ${err.message}`);
    });
  }

  sendMessage(message) {
    console.log('sendMessage', message);
    this.io.sockets.emit('message', message);
  }

  getMessages = async () => {
    let allMessages = await messages.findAll();
    console.log('getMessages', allMessages);
    // forEach(message => sendMessage(message));
  }

  handleMessage = async (value) => {
    try {
      let newMessage = await messages.create({ message: value });
      console.log('handleMessage', newMessage);
      this.sendMessage(value);
    } catch (e) {
      console.log(e.message);
    }
    // setTimeout(
    //   () => {
    //     messages.remove(message.id);
    //     this.io.sockets.emit('deleteMessage', message.id);
    //   },
    //   expiration,
    // );
  }

  disconnect() {
    this.socket.disconnect();
    // users.delete(this.socket);
  }
}

function connection(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);
  });
};

module.exports = connection;
