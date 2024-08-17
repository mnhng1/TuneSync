chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
    if (tab.url && tab.url.includes('music.youtube.com')){
        chrome.scripting.executeScript({
            taget: {tabId: tabId},
            files: ['content.js']
        })
    }
});


let socket;
let roomCode;
let roomCodePromise = new Promise((resolve) => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'roomCode') {
      roomCode = request.value;
      resolve();
    }
  });
});

//function to open websocket
function openSocket(roomCode) {
  if (roomCode) {
  socket = new WebSocket(`ws://127.0.0.1:8000/ws/youtube/${roomCode}/`);
  socket.onopen = function() {
    console.log("Connection established");
  };

  socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if (data.message === 'pause') {
        // Logic to pause YouTube video
    } else if (data.message === 'play') {
        // Logic to play YouTube video
    }
    }
  }}

//function to send message to websocket

function sendMessage(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.log("WebSocket is not open. Ready state is: " + socket.readyState);
      }
}

//open websocket when clicked the extension
chrome.browserAction.onClicked.addListener(function(tab) {
  // Open the WebSocket connection when the user clicks the extension's browser action
  openSocket(roomCode)
});


//Receive video data from content.js and send video data to websocket
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'videoData') {
      let videoData = request.value;
      sendMessage(videoData);
    }
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