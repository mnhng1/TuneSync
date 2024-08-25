/// <reference types="chrome"/>



chrome.storage.sync.get('roomCode', function(data) {
    console.log('Room code retrieved from chrome.storage:', data.roomCode);
    let roomCodeDisplay = document.getElementById('room_code')
    if (roomCodeDisplay) {
if (roomCodeDisplay.textContent === "Room is not found") {
        if (roomCode != null) {
            roomCodeDisplay.textContent += data.roomCode
        }
    }
    }
    
});