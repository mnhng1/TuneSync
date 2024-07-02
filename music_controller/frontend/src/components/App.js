import React from "react";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App(props) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width:'100vw',
      border: '2px solid red' 
    }}>
    <Router>
        <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/create-room" element = {<CreateRoomPage/>}/>
            <Route path = "/join-room" element = {<JoinRoomPage/>}/>
            <Route path = "/room/:roomCode" element = {<Room/>}/>
        </Routes>
    </Router>
    </div>
  );
}