import React from "react";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Login from "./AuthenticationPage";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the dark theme

export default function App(props) {
  return (
    <ThemeProvider theme={theme}>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width:'100vw',
      
      background: 'linear-gradient(90deg, #00001C 0%, #003366 100%)',
     
    }}>
    <Router>
        <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/create-room" element = {<CreateRoomPage/>}/>
            <Route path = "/join-room" element = {<JoinRoomPage/>}/>
            <Route path = "/room/:roomCode" element = {<Room/>}/>
            <Route path = "/login" element = {<Login/>}/>
        </Routes>
    </Router>
    </div>
    </ThemeProvider>
  );
}