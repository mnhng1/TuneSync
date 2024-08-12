


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