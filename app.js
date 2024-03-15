const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const path = require('path');

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  // Serve HTML file
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  // Serve Socket.IO client library
  app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'node_modules', 'socket.io-client', 'dist', 'socket.io.js'));
  });

  // Socket.io logic
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Broadcast message to all clients
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}