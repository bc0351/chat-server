'use strict';
const base64 = require('base-64');
function createBasicAuthString(username, password) {
  const mockUser = {
    username: 'ben',
    password: 'password'
  };
  return base64.encode(`${username}:${password}`);
}
console.log(createBasicAuthString('ben','password'));

module.exports={createBasicAuthString}
