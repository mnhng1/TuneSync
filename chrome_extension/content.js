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

togglePlayback();
