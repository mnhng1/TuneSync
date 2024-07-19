import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';


export default function Room() {
    const spotifyImageURL = "frontend/src/assets/spotify.png";
    const defaultSong = {
        title: "No song is currently playing",
        artist: "Unknown Artist",
        image_url: "spotifyImageURL",
        is_playing: false,
        time: 0,
        duration: 1,
    };
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
    const [song, setSong] = useState({
        defaultSong
    });
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
                const response = await fetch('/api/get-room' + '?code=' + roomCode);
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

        intervalRef.current = setInterval(getCurrentSong, 1000);

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

        return () => clearInterval(intervalRef.current); // Cleanup interval on component unmount
    }, [roomCode, isHost]);

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
                    return {};
                } else {
                    return response.text().then(text => text ? JSON.parse(text) : {});
                }
            })
            .then((data) => setSong(data));
        
        
    }

    if (showSetting) {
        return renderSetting();
    } else {
        return (
            
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">Code: {roomCode}</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <MusicPlayer {...song} />
                </Grid>
                {isHost && renderSettingButton()}
                <Grid item xs={12} align="center"> 
                    <Button variant="contained" color="secondary" onClick={leaveButtonPress}>Leave Room</Button>
                </Grid>
            </Grid>
        );
    }
}
