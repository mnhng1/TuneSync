
import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function JoinRoomPage(props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false); // Use a boolean for error state
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
    setError(false); // Reset error state when user changes input
  };

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
        navigate(`/room/${roomCode}`);
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
        border: "2px solid red", // Border for debugging
      }}
    >
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={error} // Use boolean error state here
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error ? "Room not found" : ""}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
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