
import React, { useState } from "react";
import { TextField, Button, Grid, Typography, FormControl } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function JoinRoomPage(props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false); // Use a boolean for error state
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState("")

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
    setError(false); // Reset error state when user changes input
  };

  function handleNameChange(e) {
    setGuestName(e.target.value)
  }


  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
        
      }),
    };

      fetch("/api/join-room", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Room not found");
            } 
            return response.json();
        })
        .then((data) => {
            const platform = data.platform;
            navigate(`/room/${platform}/${roomCode}`);
        })
        .catch((error) => {
            setError(true); // Set error to true to trigger error state in TextField
        });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
       
      }}
    >
      <Grid container spacing={2}  justifyContent="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4" color = {"white"}>
            Join a room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={error} // Use boolean error state here
            label="Code*"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error ? "Room not found" : ""}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
        <br></br>
        <br></br>
        <FormControl>
          <TextField
            required={true}
            type="string"
            inputProps={{
              min: 1,
              style: { textAlign: "left" },
            }}
            label="Name"
            onChange={handleNameChange}
            placeholder="Eg. John"
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiFormHelperText-root': {
                color: 'white',
              },
            }}
          />
        </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            to="/"
            component={Link}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}