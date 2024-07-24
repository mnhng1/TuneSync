import React from 'react';
import { Card, IconButton, LinearProgress, Grid, Typography } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';

export default function MusicPlayer(props) {
    
    const songProgress = (props.time / props.duration) * 100;

    function pauseSong(){
        const requestOptions = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
        };

        fetch('/spotify/pause-song', requestOptions)
    }

    function playSong(){
        const requestOptions = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
        };

        fetch('/spotify/play-song', requestOptions)
    }

    function skipsong(){
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
        };

        fetch('/spotify/skip-song', requestOptions)
    }

    function prevsong(){
        const requestOptions = {
            method:'POST',
            headers: {"Content-Type": "application/json"}
        }
        fetch('/spotify/prev-song', requestOptions)
    }


    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Card sx={{ height: 'auto', padding: '20px' }}> {/* Add padding here */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container alignItems="center" spacing={4}>
                    <Grid item align="center" xs={4}>
                        <img src={props.image_url} alt="album cover" height="120%" width="120%" />
                    </Grid>
                    <Grid item align="center" xs={8}>
                        <Typography component="h4" variant="h4" >{props.title}</Typography>
                        <Typography color="textSecondary" variant="subtitle2">{props.artist}</Typography>
                            <div>
                                <IconButton onClick = {prevsong}><SkipPrevious/> </IconButton>
                                <IconButton onClick={props.is_playing ? pauseSong : playSong}>
                                    {props.is_playing ? <Pause /> : <PlayArrow />}
                                </IconButton>
                                <IconButton onClick={skipsong}>
                                    <SkipNext/>
                                </IconButton>
                            </div>
                            <br></br>
                            <br></br>
                            <span style={{ margin: 'auto 0 auto auto', fontSize:"0.6rem", fontFamily:"monospace"}}>
                            <span style={{ marginRight: '20px' }}>Votes To Skip:</span>{props.votes}/{" "}{props.votes_required}
                            </span>
                    
                        
                    </Grid>
                </Grid>

            </div>
            <br></br>
            <LinearProgress variant="determinate" value={songProgress} />
            </Card>
        </div>
    );
}
