let webSocket;


// Listen for messages from the Django frontend
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if ('roomCode' in request) {
        console.log('Received room code from frontend:', request.roomCode);
    }
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        if (tab.url.startsWith('https://www.youtube.com') || tab.url.startsWith('https://music.youtube.com')) {
            // Send a message to the content script
            chrome.tabs.sendMessage(tabId, { action: "startInterval" });
            chrome.tabs.sendMessage(tabId, { action: "startWebsocket" });
        }
    }
});



// Connect to the WebSocket server

// Sends a command from the extension to the Django server


// Connect to WebSocket when the extension is installed or reloaded