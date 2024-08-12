chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
});


let socket;

chrome.runtime.onInstalled.addListener(() => {
    socket = new WebSocket("ws://127.0.0.1:8000/ws/youtube/room_name/");

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.message === 'pause') {
            // Logic to pause YouTube video
        } else if (data.message === 'play') {
            // Logic to play YouTube video
        }
    };
jandojwnao
    socket.onopen = function() {
        console.log("WebSocket connection established");
    };

    socket.onclose = function() {
        console.log("WebSocket connection closed");
    };
});

// Placeholder for messages from the main app
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "playPause") {
        executeContentScriptFunction(sender.tab.id, togglePlayback);
    } else if (message.action === "nextTrack") {
        executeContentScriptFunction(sender.tab.id, nextTrack);
    } else if (message.action === "queuePlaylist") {
        executeContentScriptFunction(sender.tab.id, queuePlaylist, message.playlistUrl);
    }
});

function executeContentScriptFunction(tabId, func, args = []) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: func,
        args: args
    });
}