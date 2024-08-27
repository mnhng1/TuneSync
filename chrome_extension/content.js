let socket;
let intervalId;
let roomCode = null;

//function to get video thumbnail
function getVideoThumbnail() {
    const video = document.querySelector('video');
    if (!video) return null;

    // Try to get the thumbnail URL from various potential sources
    const thumbnailElement = document.querySelector('ytd-thumbnail img#img');
    if (thumbnailElement) {
        // Extract the URL from the backgroundImage style
        const backgroundImage = window.getComputedStyle(thumbnailElement).backgroundImage;
        return backgroundImage.slice(5, -2); // Remove url(" and ")
    }

    // Fallback: construct URL based on video ID
    const videoId = new URLSearchParams(window.location.search).get('v');
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    return null;
}

// Function to fetch YouTube video data
function getYouTubeVideoData() {
    let video = document.querySelector('video');
    if (!video) return null;

    let titleElement = document.querySelector('.title.style-scope.ytd-video-primary-info-renderer');
    let title = titleElement ? titleElement.innerText : '';

    
    let thumbnailUrl = getVideoThumbnail()
    let currentTime = video.currentTime;
    let duration = video.duration;

    
    

    let state = video.paused ? 'paused' : 'playing';
    console.log({ type: 'video_data', title, thumbnailUrl, currentTime, duration, state });
    return { type: 'video_data', title, thumbnailUrl, currentTime, duration, state };
}

// Function to send video data to background.js
function sendVideoData() {
    let videoData = getYouTubeVideoData();
    if (videoData) {
        chrome.runtime.sendMessage({ action: "sendDataToWebSocket", data: videoData });
    }
}

// Function to start the interval polling
function startInterval() {
    console.log('Start Interval')
    if (!intervalId) {
        intervalId = setInterval(sendVideoData, 1000);
    }
}

// Function to stop the interval polling
function stopInterval() {
    console.log('Stop Interval')
    if (intervalId) {
        // Send one last update to ensure the state is correct before stopping
        sendVideoData();
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Add event listeners to handle play and pause events
function addVideoEventListeners() {
    let video = document.querySelector('video');
    if (video) {
        video.addEventListener('play', startInterval);
        video.addEventListener('pause', stopInterval);
    }
}

// Listener for setupVideoListeners action from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setupVideoListeners") {
        addVideoEventListeners();
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "playVideo") {
        sendVideoData()
        let video = document.querySelector('video');
        if (video) {
            video.play().catch(error => {
                console.error('Error playing video:', error);
            });
        } else {
            console.warn('No video element found for play action.');
        }
    }

    if (request.action === "pauseVideo") {
        let video = document.querySelector('video');
        if (video) {
            video.pause().catch(error => {
                console.error('Error pausing video:', error);
            });
        } else {
            console.warn('No video element found for pause action.');
        }
    }

    if (request.action === "nextVideo") {
        let video = document.querySelector('video');
        let nextButton = document.querySelector('.ytp-next-button');
        if (video && nextButton) {
            try {
                nextButton.click();
            } catch (error) {
                console.error('Error clicking next button:', error);
            }
        } else {
            console.warn('No video element or next button found for next action.');
        }
    }

    if (request.action === "prevVideo") {
        let video = document.querySelector('video');
        let prevButton = document.querySelector('.ytp-prev-button');
        console.log('content prev video')
        if (video && prevButton) {
            try {
                prevButton.click();
            } catch (error) {
                console.error('Error clicking prev button:', error);
            }
        } else {
            console.warn('No video element or prev button found for next action.');
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
        chrome.runtime.sendMessage({ action: "startWebsocket", roomCode: event.data.roomCode });
    }
});