import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Grid, Button, Typography, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import theme from './theme';
import logo from '../assets/logo.jpg';
const useStyles = {
  root: css({
    height: '100vh',
    backgroundColor: '#121212', // You can use the theme.palette.background.default here if defined
    color: '#ffffff', // You can use the theme.palette.text.primary here if defined
    position: 'relative',
    padding: '20px', // Optional: Add some padding
  }),
  roomCode: css({
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: 'white', // Ensure the font color is white
  }),
};

export default function RoomSpotify() {
  const classes = useStyles;
 
  
  const { roomCode } = useParams();
  const {platform } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(null);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  
  

  const defaultSong = {
    title: "No song is currently playing",
    artist: "Unknown Artist",
    image_url: logo,
    is_playing: false,
    time: 0,
    duration: 1,
    votes_required: votesToSkip,
    votes: 0,
  };

  const [song, setSong] = useState(defaultSong);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  function updateShowSetting() {
    setShowSetting(prev => !prev);
  }

  function renderSettingButton() {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={updateShowSetting}>Show Setting</Button>
      </Grid>
    );
  }

  function renderSetting() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanPause={guestCanPause} roomCode={roomCode} />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={updateShowSetting}>Close Setting</Button>
        </Grid>
      </Grid>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get-room?code=${roomCode}&platform=spotify`);
        if (!response.ok) {
          if (response.status === 404) {
            console.error('Room not Found')
            navigate("/")
          }
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

    

    if (isHost) {
      fetch('/spotify/is-authenticated')
        .then((response) => response.json())
        .then((data) => {
          setSpotifyAuthenticated(data.status);
          if (!data.status) {
            fetch('/spotify/get-auth-url')
              .then((response) => response.json())
              .then((data) => {
                window.location.replace(data.url);
              });
          }
        });
    }
    console.log(defaultSong.votes_required)
     // Cleanup interval on component unmount
  }, [roomCode, isHost]);
const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      clearInterval(intervalRef.current);
    }
    else {intervalRef.current = setInterval(getCurrentSong, 1000);}
    console.log(song)
    return () => clearInterval(intervalRef.current);
  }, [song])

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

  function getCurrentSong() {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          setSong(defaultSong);
        } else {
            return response.text().then(text => text ? JSON.parse(text) : {});
        }
      })
      .then((data) => {
        if (!data.title) {
            setSong(defaultSong)
        } else {
            setSong(data);
        }
        
      }
        )
    
      };


  if (showSetting) {
    return renderSetting();
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div css={classes.root}>
          
        
          
          <Grid container spacing={1}>
          <Typography variant="h5" component="div" color={'white'} sx={{ color: 'white', position: 'absolute', top: 10, right: 20 } }>Room Code: {roomCode}</Typography>
            <Grid item xs={12}  sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
              <MusicPlayer {...song} />
            </Grid>
            {isHost && renderSettingButton()}
            <Grid item xs={12} align="center">
              <Button variant="contained" color="secondary" onClick={leaveButtonPress}>Leave Room</Button>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}
