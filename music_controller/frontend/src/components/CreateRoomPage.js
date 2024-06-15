
import React, {Component} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {Link} from "react-router-dom";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import   { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoomPage(props) {
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const navigate = useNavigate();

    const handleVotesChange = (e) => {
        setVotesToSkip(parseInt(e.target.value));
    };
    
    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === "true");
    };

    const handleCreateRoomButton = () => {
        
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            })
        };

        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate(`/room/${data.code}`))
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width:'100vw',
            border: '2px solid red' // Border for debugging
          }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center"  >
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
              onChange={handleVotesChange}

            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateRoomButton}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
      </div>
    );
  }