import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import theme from './theme';
import logo from '../assets/logo.jpg';
import { IconButton, Box } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';




export default function RoomYoutube(props, message){
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false)
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


    //send roomcode to extension for websocket connection 
    //

    

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


    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
      // Handle play/pause logic here, e.g., send WebSocket message
  };

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
       
      
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#181818',
                color: 'white',
                p: 3,
                borderRadius: 2,
                maxWidth: 300,
                mx: 'auto',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Now Playing
            </Typography>
            <Typography variant="body1" gutterBottom>
                Song Title - Artist Name
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => { /* Handle previous track logic */ }}>
                    <SkipPreviousIcon sx={{ color: 'white', fontSize: 40 }} />
                </IconButton>
                <IconButton onClick={handlePlayPause}>
                    {isPlaying ? (
                        <PauseCircleFilledIcon sx={{ color: 'white', fontSize: 60 }} />
                    ) : (
                        <PlayCircleFilledWhiteIcon sx={{ color: 'white', fontSize: 60 }} />
                    )}
                </IconButton>
                <IconButton onClick={() => { /* Handle next track logic */ }}>
                    <SkipNextIcon sx={{ color: 'white', fontSize: 40 }} />
                </IconButton>
                
            </Box>
            <Button variant="contained" color="secondary" onClick={leaveButtonPress}>Leave Room</Button>
        </Box>
        
        
        
    );
              
            

          
            
       
    
}