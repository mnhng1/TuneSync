import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography, Box, useMediaQuery, Divider } from '@mui/material';
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import RoomSpotify from "./RoomSpotify";
import RoomYoutube from "./RoomYoutube";
import TypingEffect from 'react-typing-effect';



function RenderHomePage() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Box
            id="main"
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                background: 'linear-gradient(90deg, #00001C 0%, #003366 100%)',
            }}
        >
            {/* Main Content Section */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'white',
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden', // Hide overflow in this section
                }}
            >
                {/* Fixed Content Above Typing Effect */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        color: 'rgb(216, 230, 255)',
                        fontWeight: 'bold',
                        '@media (max-width: 768px)': {
                            top: 8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                        },
                    }}
                >
                    <Typography variant="h6" component="h1">
                        TuneSync
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        top: 80, // Adjust to avoid overlap with title
                        left: 16,
                        width: 'calc(100% - 32px)', // Full width minus padding
                        maxHeight: 'calc(100vh - 80px - 80px)', // Adjust based on padding and button height
                        overflowY: 'auto', // Allow vertical scrolling
                        color: 'rgb(216, 230, 255)',
                        textAlign: 'left',
                        whiteSpace: 'pre-wrap',
                        '@media (max-width: 768px)': {
                            top: 40, // Adjust for mobile
                            textAlign: 'center',
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        mt={8}
                        sx={{
                            fontSize: '4.5rem',
                            lineHeight: '1.5',
                            fontWeight: 'bold',
                            '@media (max-width: 768px)': {
                                fontSize: '2.5rem',
                                paddingTop: '2rem',
                            },
                        }}
                    >
                        <TypingEffect
                            text={[
                                "Unified listening with real-time music syncing and shared playlists.",
                                "Collaborate effortlessly with friends on dynamic music queues and live sessions.",
                                "Create and enjoy synchronized playlists together with seamless integration.",
                                "Join forces in crafting the ultimate shared music experience with live updates.",
                            ]}
                            speed={40}
                            eraseSpeed={40}
                            typingDelay={500}
                            eraseDelay={2500}
                            cursor=' '
                        />
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 80, // Space for buttons
                        width: 'calc(100% - 32px)', // Full width minus padding
                        pt: 3,
                        mb: 10,
                        pb: 2,
                        textAlign: 'center',
                        color: '#003366',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    <Typography
                    variant="h6"
                    component="p"
                    sx={{
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        borderTop: '2px solid #003366',
                        backgroundImage: 'linear-gradient(90deg, #e7e3f4 100%, #00001C 0%)', // Gradient background
                        WebkitBackgroundClip: 'text', // For WebKit browsers
                        backgroundClip: 'text', // For other browsers
                        color: 'transparent', // Hide the text color
                        
                        borderRadius: '4px', // Rounded corners for a modern look,
                        paddingTop: 4,
                        whiteSpace: 'pre-wrap', // Ensure text wraps correctly
                        width: 'calc(100% - 32px)', // Adjust width if needed
                        mx: 'auto', // Center horizontally
                        '@media (max-width: 768px)': {
                            fontSize: '1rem', // Adjust font size for mobile devices
                            paddingTop: '1rem', // Adjust padding for mobile devices
                        },
                    }}
                >
                    "Experience music like never before with TuneSync. Collaborate with friends to create and enjoy synchronized playlists, share music seamlessly, and elevate your listening experience together with your own favorite music platforms."
                </Typography>
                </Box>
            </Box>

            {/* Button Section */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'center',
                    background: 'rgba(216, 230, 255, 0.9)',
                    p: 2,
                    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    sx={{
                        backgroundColor: 'rgba(216, 230, 255, 0)',
                        color: '#003366',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#0466f9',
                            boxShadow: 0,
                        },
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '3px',
                        boxShadow: 0,
                        px: 4,
                        py: 2,
                        fontSize: '1rem',
                        '@media (max-width: 768px)': {
                            fontSize: '0.875rem',
                            px: 3,
                            py: 1.5,
                        },
                        m: 1,
                    }}
                    to="/join-room"
                    component={Link}
                >
                    JOIN ROOM
                </Button>

                <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                        backgroundColor: 'rgba(216, 230, 255, 0)',
                        color: '#003366',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#0466f9',
                            boxShadow: 0,
                        },
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '3px',
                        boxShadow: 0,
                        px: 4,
                        py: 2,
                        fontSize: '1rem',
                        '@media (max-width: 768px)': {
                            fontSize: '0.875rem',
                            px: 3,
                            py: 1.5,
                        },
                        m: 1,
                    }}
                    to="/create-room"
                    component={Link}
                >
                    CREATE ROOM
                </Button>
            </Box>
        </Box>
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
                    console.log(data.code)
                    setRoomCode(data.code);
                    console.log(data.platform)
                    fetch('/api/get-room?code=' + data.code).then((response) => response.json()).then((data) => {data.platform ==="youtube" ?navigate(`/room/youtube/${data.code}`):navigate(`/room/spotify/${data.code}`)} )
                    
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
            <Route path="/room/spotify/:roomCode" element={<RoomSpotify/>}  />
            <Route path = "/room/youtube/:roomCode" element = {<RoomYoutube/>}/>
        </Routes>
    );
}

