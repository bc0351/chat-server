const uuid = require('uuid').v4;
const messages = new Set();
const users = new Map();

const defaultUser = {
  username: 'Anonymous'
};

// message expiration time set to 5 minutes
const expiration = 5 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    this.socket.on('getMessages', () => this.getMessages());
    socket.on('message', (value) => this.handleMessage(value));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`ERROR: ${err.message}`);
    });
  }

  sendMessage(message) {
    console.log(message);
    this.io.sockets.emit('message', message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    const message = {
      id: uuid(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: new Date()
    };

    console.log(message);
    messages.add(message);
    this.sendMessage(message);

    setTimeout(
      () => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      },
      expiration,
    );
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);
  });
};

module.exports = chat;
