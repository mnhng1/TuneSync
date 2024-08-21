let socket;

// Connect to the WebSocket server
function connectWebSocket(roomCode) {
    socket = new WebSocket(`ws://127.0.0.1:8000/ws/room/youtube/${roomCode}/`);

    socket.onopen = function() {
        console.log("WebSocket connection established.");
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("Received message: ", data);

        

    socket.onclose = function(event) {
        console.log("WebSocket connection closed: ", event);
    };

    socket.onerror = function(error) {
        console.error("WebSocket error: ", error);
    };
}}

// Sends a command from the extension to the Django server


// Connect to WebSocket when the extension is installed or reloaded