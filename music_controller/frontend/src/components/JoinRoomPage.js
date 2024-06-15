
import React, {Component, useState} from "react";
import { TextField,Button, Grid, Typography } from "@mui/material";
import {Link} from "react-router-dom"; 



export default function JoinRoomPage(props) {
   // Add this line to log the value of the name prop
  const [roomCode,setroomCode] = useState("")
  const [Error,setError] = useState("")

  const handleTextFieldChange = (e) => {
    setroomCode(e.target.value);
    
  };

  const roomButtonPressed = () => {
    console.log(roomCode)
  }

   return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      border: '2px solid red' // Border for debugging
    }}>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">Join a room</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={Error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={Error}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant = "contained" color="primary" onClick={roomButtonPressed}>Enter Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant = "contained" color="secondary" to="/" component = {Link}>Back</Button>
        </Grid>
      </Grid>
    </div>


    
  );}
