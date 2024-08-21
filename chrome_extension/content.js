function getYouTubeVideoData() {
    let video = document.querySelector('video');
    if (!video) return null;
    
    let title = document.querySelector('.title.style-scope.ytd-video-primary-info-renderer')?.innerText || '';
    let thumbnailUrl = document.querySelector('.ytp-cued-thumbnail-overlay-image')?.style.backgroundImage.slice(5, -2) || '';
    let currentTime = video.currentTime;
    let state = video.paused ? 'paused' : 'playing';
    
    return { title, thumbnailUrl, currentTime, state };
}

// Listen for messages from the web page
window.addEventListener('message', function(event) {
  // If the message contains a 'roomCode'
  if ('roomCode' in event.data) {
    // Send the room code to the background script
    chrome.runtime.sendMessage({ roomCode: event.data.roomCode });
  }
});



socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.action === 'play') {
        document.querySelector('video')?.play();
    } else if (data.action === 'pause') {
        document.querySelector('video')?.pause();
    } else if (data.action === 'next') {
        document.querySelector('.ytp-next-button')?.click();
    }
    // Handle other actions
};

// Periodically send video data to the Django backend
setInterval(() => {
    const videoData = getYouTubeVideoData();
    if (videoData) {
        sendVideoDataToWebSocket(videoData);
    }
}, 5000);