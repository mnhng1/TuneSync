import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function Room(props) {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

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
                // Handle error state here if needed
            }
        };

        fetchData(); // Call fetchData when roomCode changes or on component mount
    }, [roomCode]); // useEffect dependency: re-run fetchData when roomCode changes

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
}