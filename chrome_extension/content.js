let socket
let roomCode

function getYouTubeVideoData() {
    let video = document.querySelector('video');
    if (!video) return null;

    // Get the video title
    let titleElement = document.querySelector('.title.style-scope.ytd-video-primary-info-renderer');
    let title = titleElement ? titleElement.innerText : '';

    // Get the video thumbnail
    let thumbnailElement = document.querySelector('.ytp-cued-thumbnail-overlay-image');
    let thumbnailUrl = thumbnailElement ? thumbnailElement.style.backgroundImage.slice(5, -2) : '';

    // Get the current time and state of the video
    let currentTime = video.currentTime;
    let duration = video.duration;
    let state = video.paused ? 'paused' : 'playing';
    console.log({ title, thumbnailUrl, currentTime, duration, state })
    return { title, thumbnailUrl, currentTime, duration, state };
}




function sendVideoData(socket, VideoData) {
    return new Promise((resolve, reject) => {
        if (socket.readyState !== WebSocket.OPEN){
            reject(new Error('Socket not open'))
        }

        try {
            socket.send(JSON.stringify(VideoData))
        } catch (error) {
            reject(error)
        }
    });
}



//Receive message action from background.js to see active tab is youtube, then send request to fetch current youtube video

let intervalId;


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startInterval") {

        if (intervalId) clearInterval(intervalId);

        intervalId = setInterval(() => {
            const videoData = getYouTubeVideoData();
            if (videoData && socket) {
                sendVideoData(socket, videoData).catch(error => console.error("Failed to send video data: ", error));
            }
        }, 1000);
    }
});


// Listen for room code from the webpage (sent by Django frontend)
window.addEventListener('message', function(event) {
    if (event.source !== window || !event.data.roomCode) return;  // Only accept messages from the same window with roomCode

    roomCode = event.data.roomCode;
    chrome.storage.sync.set({roomCode: 'roomCode'})
    chrome.storage.sync.set({roomCode: event.data.roomCode}, function() {
        console.log('Room code saved to chrome.storage');
    })
    
});





function connectWebSocket(roomCode) {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/room/youtube/${roomCode}`);
    
    socket.onopen = function() {
        console.log("WebSocket connection established.");
        socket.send(JSON.stringify({message: "Hello from the extension!"}));
    };
    
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("Received message: ", data);
    };
    
    socket.onclose = function(event) {
        chrome.storage.sync.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            } else {
                console.log('All data cleared from chrome.storage');
            }
        });
        console.log("WebSocket connection closed: ", event);
    };
    
    socket.onerror = function(error) {
        console.error("WebSocket error: ", error);
    };
    
    return socket;
}



//Listen to StartWebsocket from background.js, then start websocket. Check if roomCode in local storage or sync storage 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startWebsocket") {
        let webSocketroomCode = null
        chrome.storage.sync.get('roomCode', function(data){
            webSocketroomCode = data.roomCode
        })
        if (webSocketroomCode)
        connectWebSocket(webSocketroomCode)
    }
});
