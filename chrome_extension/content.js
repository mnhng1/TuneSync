// Function to execute a command on the YouTube player
function controlYouTubePlayback(command) {
    const video = document.querySelector('video');
    if (!video) return;

    switch (command) {
        case 'play':
            video.play();
            break;
        case 'pause':
            video.pause();
            break;
        // Add more controls like 'next', 'previous', etc.
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command) {
        controlYouTubePlayback(request.command);
    }
});
