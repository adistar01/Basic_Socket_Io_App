import React, { useEffect, useState } from "react";

const Chats = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chats;
