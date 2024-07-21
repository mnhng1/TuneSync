import React from 'react';
import { Card, IconButton, LinearProgress, Grid, Typography } from '@mui/material';
import { PlayArrow, Pause, SkipNext } from '@mui/icons-material';

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


    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Card sx={{ height: 'auto' }}>
                <Grid container alignItems="center">
                    <Grid item align="center" xs={4}>
                        <img src={props.image_url} alt="album cover" height="100%" width="100%" />
                    </Grid>
                    <Grid item align="center" xs={8}>
                        <Typography component="h4" variant="h4">{props.title}</Typography>
                        <Typography color="textSecondary" variant="subtitle1">{props.artist}</Typography>
                        <div>
                            <IconButton onClick={props.is_playing ? pauseSong :playSong} >{props.is_playing ? <Pause /> : <PlayArrow />}</IconButton>
                            <IconButton onClick ={skipsong}><SkipNext/>{"      "}{props.votes}/{" "}{props.votes_required}</IconButton>
                        </div>
                    </Grid>
                </Grid>
                <LinearProgress variant="determinate" value={songProgress} />
            </Card>
        </div>
    );
}
