// HomePage.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";





function RenderHomePage() {
    return (
        <Grid container spacing={3} align="center" justifyContent="center">
            <Grid item xs={12} align="center" >
                <Typography variant="h3" component="h3" color={'white'}>
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join-room" component={Link}>Join A Room</Button>
                    <Button color="secondary" to="/create-room" component={Link}>Create A Room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}



export default function HomePage(props) {
    const [roomCode, setRoomCode] = React.useState(null)
    const navigate = useNavigate()
    
    
    React.useEffect(() => {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                if (data.code) {
                    
                    setRoomCode(data.code);
                    navigate(`/room/${data.code}`);
                }
            })
            .catch((error) => {
                console.error('Error fetching room data:', error);
            });
    }, [roomCode]);
    
    return (
        <Routes>
            <Route exact path="/" element={roomCode? null: <RenderHomePage />}  />
            <Route path="/create-room" element={<CreateRoomPage />} />
            <Route path="/join-room" element={<JoinRoomPage />} />
            <Route path="/room/:roomCode" element={<Room  />}  />
        </Routes>
    );
}

