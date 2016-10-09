/**
 * Socket.io configuration
 */
'use strict';

// import config from './environment';

// When the user disconnects.. perform this
function onDisconnect(/*socket*/) {}

// When the user connects.. perform this
function onConnect(socket,socketio) {

  //Set the room for particular channel
  socket.on('room',data => {
    socket.join(data);
  });
  //send message to the people in channel
  socket.on('channel-message', data => {
    console.log('Socket:id'+socket.id);
    console.log("Data:"+data);
    socketio.to(data.room).emit('channel-message',data);
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/organisation/organisation.socket').register(socket);
  //require('../api/thing/thing.socket').register(socket);
}

export default function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket,socketio);
    socket.log('CONNECTED');
  });
}
