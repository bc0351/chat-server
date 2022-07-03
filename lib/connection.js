'use strict';
const dataModules = require('../src/models/index');

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
    console.log(message);
    this.io.sockets.emit('message', message);
  }

  getMessages = async () => {
    await messages.findAll().forEach(message => sendMessage(message));
  }

  handleMessage = async (value) => {
    try {
    let message = await messages.create({message: value});
    this.sendMessage(message);
    } catch(e) {
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
    users.delete(this.socket);
  }
}

function connection(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);
  });
};

module.exports = connection;
