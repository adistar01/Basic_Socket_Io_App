import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chats from "./Chats";

const socket = io.connect("http://localhost:5001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
      <p>Hello</p>
      <h3>Join a chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room Id..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
      <Chats socket={socket} username={userName} room={room} />
    </div>
  );
}

export default App;
