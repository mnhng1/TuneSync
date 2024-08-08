import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import theme from './theme';
import logo from '../assets/logo.jpg';



export default function RoomYoutube(props, message){
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [votesToSkip, setVotesToSkip] = useState(null);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSetting, setShowSetting] = useState(false);

    const chatSocket = new WebSocket(
      'ws://'
      + window.location.host
      + '/ws/room/youtube/'
      + roomCode
    );

    console.log(roomCode)

    function sendMessage(message) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(EXTENSION_ID, message, function(response) {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
    }
    
    async function searchVideos(query) {
      return sendMessage({action: 'search', query: query});
    }




    function leaveButtonPress() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
    
        fetch('/api/leave-room', requestOptions)
          .then(_response => {
            navigate("/");
          })
          .catch(error => {
            console.error('Error:', error);
            navigate("/");
          });
    
      }


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
       <Grid container spacing={2}>
        <Grid item xs={12} align="center">
              <Button variant="contained" color="secondary" onClick={leaveButtonPress}>Leave Room</Button>
            </Grid>
       </Grid>
    )
}