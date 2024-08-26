let socket;
let intervalId;
let roomCode = null;

// Function to fetch YouTube video data
function getYouTubeVideoData() {
    let video = document.querySelector('video');
    if (!video) return null;

    let titleElement = document.querySelector('.title.style-scope.ytd-video-primary-info-renderer');
    let title = titleElement ? titleElement.innerText : '';

    let thumbnailElement = document.querySelector('.ytp-cued-thumbnail-overlay-image');
    let thumbnailUrl = thumbnailElement ? thumbnailElement.style.backgroundImage.slice(5, -2) : '';

    let currentTime = video.currentTime;
    let duration = video.duration;
    let state = video.paused ? 'paused' : 'playing';

    return { type: 'youtubeVideoData', title, thumbnailUrl, currentTime, duration, state };
}

// Function to send data via WebSocket and listen such request from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startInterval") {
        intervalId = setInterval(function() {
            let videoData = getYouTubeVideoData();
            if (videoData) {
                // Send videoData to background.js to be sent to the WebSocket
                chrome.runtime.sendMessage({action: "sendDataToWebSocket", data: videoData});
                if (videoData.state === "pause") {
                    clearInterval(intervalId);
                }
            }
        }, 1000);
    } else if (request.action === "resumeInterval") {
        if (!intervalId) {
            intervalId = setInterval(function() {
                let videoData = getYouTubeVideoData();
                if (videoData) {
                    // Send videoData to background.js to be sent to the WebSocket
                    chrome.runtime.sendMessage({action: "sendDataToWebSocket", data: videoData});
                }
            }, 1000);
        }
    }
});





// Listener for WebSocket setup
window.addEventListener('message', function(event) {
    if (event.data && event.data.roomCode) {
        roomCode = event.data.roomCode;
        chrome.storage.sync.set({ roomCode }, () => {
            console.log('Room code saved to chrome.storage');
        });
        chrome.runtime.sendMessage({action: "startWebsocket", roomCode: event.data.roomCode});
        
    }
});