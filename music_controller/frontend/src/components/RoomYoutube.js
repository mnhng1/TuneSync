import React, { useState, useEffect, useRef } from 'react';
import { json, useNavigate, useParams } from "react-router-dom";
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

    const chatSocket = useRef(null);
    
    const defaultMedia = {
      title: "",
      thumbnailUrl: "",
      currentTime: 0,
      duration: 0,
      state: ""
  };

    const [Media, SetMedia ] = useState(defaultMedia)

    
    
    




   


    const handlePlayPause = () => {
      
     
      setIsPlaying(Media.state === "playing");
      // Handle play/pause logic here, e.g., send WebSocket message
  };

    function leaveButtonPress() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
    
        fetch('/api/leave-room', requestOptions)
          .then(response => {
            if (!response.ok) {
              console.error('Failed to close room:', response.statusText)
            }
            chatSocket.current.close();
            navigate("/");
          })
          .catch(error => {
            console.error('Error:', error);
            chatSocket.current.close();
            navigate("/");
          });
    
      }


    useEffect( () => {
        const fetchData = async () => {
            try {
              const response = await fetch(`/api/get-room?code=${roomCode}&platform=youtube`)
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
          console.log('Sending room code to extension:', roomCode);
          
          window.postMessage({ roomCode: roomCode }, '*');

          //Run Websocket
          chatSocket.current = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/room/youtube/'
            + roomCode 
          );
      
            
          chatSocket.current.onopen = () => {
            chatSocket.current.send(JSON.stringify({message: "Hello from the frontendt!"}));
          }

          chatSocket.current.onclose = function(event) {
            console.log('WebSocket is closed now.');
        };
      
          chatSocket.current.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'youtubeVideoData') {
                // Handle messages of type 'specificType'
                console.log('Specific message received: ', message.content);
                SetMedia(message.content)
            } else {
                console.log('Other message received: ', message);
            }
        });
          return () => {
            if (chatSocket.current) {
                chatSocket.current.close();
            }
        };
    }, []);


    
    
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
                {Media.artist}
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