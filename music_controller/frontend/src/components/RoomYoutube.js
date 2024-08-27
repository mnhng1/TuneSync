import React, { useState, useEffect, useRef } from 'react';
import { json, useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, ThemeProvider, Slider } from '@mui/material';
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
    
    const [HostName, setHostName] = useState('')


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
      setIsPlaying(Media.state);
      const action = Media.state === 'playing' ? 'pause' : 'play'; 
      // Handle play/pause logic here, e.g., send WebSocket message
      console.log(action)
      chatSocket.current.send(JSON.stringify({action:action}));
  };

    const handleNextTrack = () => {
      const action = 'next';
      console.log(action)
      chatSocket.current.send(JSON.stringify({action: action}))
    }
    const handlePrevTrack = () => {
      
      const action = 'prev';
      console.log(action)
      chatSocket.current.send(JSON.stringify({action: action}))
    
    }
      

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
              setHostName(roomData.host_name)
              
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
            SetMedia(message)
            setIsPlaying(message.state)
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
              {Media.title}
          </Typography>
          {Media.thumbnailUrl && (
              <Box 
                  sx={{
                      mb: 2,
                      width: 180, // Increased width
                      height: 135, // Increased height
                      borderRadius: 2,
                      overflow: 'hidden',
                      // Removed border and adjusted box shadow for a clean look
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                  }}
              >
                  <img 
                      src={Media.thumbnailUrl} 
                      alt="Thumbnail" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
              </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handlePrevTrack}>
                  <SkipPreviousIcon sx={{ color: 'white', fontSize: 40 }} />
              </IconButton>
              <IconButton onClick={handlePlayPause}>
                  {isPlaying === "playing" ? (
                      <PauseCircleFilledIcon sx={{ color: 'white', fontSize: 60 }} />
                  ) : (
                      <PlayCircleFilledWhiteIcon sx={{ color: 'white', fontSize: 60 }} />
                  )}
              </IconButton>
              <IconButton onClick={handleNextTrack}>
                  <SkipNextIcon sx={{ color: 'white', fontSize: 40 }} />
              </IconButton>
          </Box>
          <Slider
              aria-label="Duration slider"
              value={Media.currentTime}
              min={0}
              max={Media.duration}
              sx={{ color: 'secondary.main', width: 200 }}
              disabled
          />
          <Button variant="contained" color="secondary" onClick={leaveButtonPress}>Leave Room</Button>
          
          
      </Box>
  );
              
            

          
            
       
    
}