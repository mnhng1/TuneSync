

document.getElementById('playPauseBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: togglePlayback
        });
    });
});

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
