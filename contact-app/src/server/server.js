const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Sample course data
let courseModel = {
  id: 1,
  name: 'Introduction to React Native',
  // ... other fields
  likes: 0, // Add a new field for likes
};

wss.on('connection', (ws) => {
  // Send initial likes count to the connected client
  ws.send(JSON.stringify({ type: 'likes', likes: courseModel.likes }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // Update likes count when a like is received
    if (data.type === 'like') {
      courseModel.likes += 1;
      // Broadcast the updated likes count to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'likes', likes: courseModel.likes }));
        }
      });
    }
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});
