


function getYouTubeVideoData(){
    let video = document.querySelector('video');
    let title = document.querySelector('.title.style-scope.ytd-video-primary-info-renderer').innerText;
    let thumbnailUrl = document.querySelector('.ytp-cued-thumbnail-overlay-image').style.backgroundImage.slice(5, -2);
    let currentTime = videoElement.currentTime;
    let state = videoElement.paused ? 'paused' : 'playing';
    return {title, thumbnailUrl, currentTime, state};
}

chrome.runtime.sendMessage('kmbpidpnhglinjeoljhdhgpegmcoadnm', {type: 'videoData', value: getYouTubeVideoData()});

function togglePlayback() {
    let video = document.querySelector('video');
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
}

function nextTrack() {
    let nextButton = document.querySelector('.ytp-next-button');
    if (nextButton) {
        nextButton.click();
    }
}

function queuePlaylist(playlistUrl) {
    // Logic to queue the playlist
    window.location.href = playlistUrl;
    // Optionally, you could add further logic to ensure the playlist starts playing automatically.
}