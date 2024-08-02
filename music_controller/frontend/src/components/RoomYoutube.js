import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import theme from './theme';
import logo from '../assets/logo.jpg';


export default function RoomYoutube(){
    const { roomCode } = useParams();

    useEffect( () => {
        const fetchData = async () => {
            try {
              const response = await fetch('/api/get-room?code=' + roomCode);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const roomData = await response.json();
              setVotesToSkip(roomData.votes_to_skip);
              setGuestCanPause(roomData.guest_can_pause);
              setIsHost(roomData.is_host);
            } catch (error) {
              console.error('Error fetching room details:', error);
              navigate("/");
            }
          };
          fetchData();
    }

    )
    return (
        <h1> Youtube UI</h1>
    )
}