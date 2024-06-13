import React from "react";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage"
import CreateRoomPage from "./CreateRoomPage"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App(props) {
  return (
    <Router>
        <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/create-room" element = {<CreateRoomPage/>}/>
            <Route path = "/join-room" element = {<JoinRoomPage/>}/>
        </Routes>
    </Router>
  );
}