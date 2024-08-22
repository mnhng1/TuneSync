let socket;


// Listen for messages from the Django frontend
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if ('roomCode' in request) {
        console.log('Received room code from frontend:', request.roomCode);
        
        
    }
});




// Connect to the WebSocket server

// Sends a command from the extension to the Django server


// Connect to WebSocket when the extension is installed or reloaded