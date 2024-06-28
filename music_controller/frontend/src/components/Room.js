import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {Grid, Button, Typography} from '@mui/material'
import { Link } from "react-router-dom"

export default function Room(props) {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const navigate = useNavigate()

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
                navigate("/")
                // Handle error state here if needed
            }
        };

        fetchData(); // Call fetchData when roomCode changes or on component mount
    }, [roomCode]); // useEffect dependency: re-run fetchData when roomCode changes


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
            });
    }


    return (
        <Grid container spacing = {1}>

            <Grid item xs = {12} align = "center">
                <Typography variant='h4' component="h4">Code: {roomCode} </Typography>
            </Grid>

            <Grid item xs = {12} align = "center">
                <Typography variant='h6' component="h6">Votes: {votesToSkip} </Typography>
            </Grid>

            <Grid item xs = {12} align = "center">
                <Typography variant='h6' component="h6">Guest Can Pause: {guestCanPause.toString()}</Typography>
            </Grid>

            <Grid item xs = {12} align = "center">
                <Typography variant='h6' component="h6">Host: {isHost.toString()}</Typography>
            </Grid>

            <Grid item xs = {12} align = "center"> 
                <Button variant = "contained" color = "secondary" onClick={leaveButtonPress} > Leave Room </Button>
            </Grid>
        </Grid>
    );
}

