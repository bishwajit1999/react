import React, { useState, useEffect } from 'react';
import WebSocket from 'react-websocket';
import courseModel from './courseModel';


const CourseListing = () => {
  const [likes, setLikes] = useState(courseModel.likes);

  const handleData = (data) => {
    const message = JSON.parse(data);
    if (message.type === 'likes') {
      setLikes(message.likes);
    }
  };

  const handleLike = () => {
    // Send a like to the server
    // For simplicity, you can use a button click to simulate a like
    // In a real scenario, this might be triggered by a user action
    websocketRef.sendMessage(JSON.stringify({ type: 'like' }));
  };

  return (
    <div>
      <h2>{courseModel.name}</h2>
      <p>{`Likes: ${likes}`}</p>
      <button onClick={handleLike}>Like</button>

      {/* WebSocket connection */}
      <WebSocket
        url="ws://localhost:3001"
        onMessage={handleData}
        reconnect={true}
      />
    </div>
  );
};

export default CourseListing;
