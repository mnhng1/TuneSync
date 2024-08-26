

///Handle listerner from content.js, if receive message to startWebsocket, then start websocket connection
let websocket;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startWebsocket") {
        // Establish a WebSocket connection
        websocket = new WebSocket(`ws://127.0.0.1:8000/ws/room/youtube/${request.roomCode}` );
        websocket.onopen = function(event) {
            console.log('WebSocket connection opened:', event);
        };
        websocket.onmessage = function(event) {
            console.log('WebSocket message received:', event.data);
        };
        websocket.onerror = function(error) {
            console.error('WebSocket error:', error);
        };
        websocket.onclose = function(event) {
            console.log("WebSocket connection closed: ", event);
            
        };
    }
});




chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        if (tab.url.startsWith('https://www.youtube.com') || tab.url.startsWith('https://music.youtube.com')) {
            // Send a message to the content script to start fetching video data
            chrome.tabs.sendMessage(tabId, { action: "startInterval" });

        }
    }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action  === "sendDataToWebSocket" ){
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            console.log(request.data)
            websocket.send(JSON.stringify(request.data));
        }
    }
})
