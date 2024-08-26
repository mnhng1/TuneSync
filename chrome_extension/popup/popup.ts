/// <reference types="chrome"/>

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync' && changes.roomCode) {
        console.log('Room code changed:', changes.roomCode.newValue);
        let roomCodeDisplay = document.getElementById('room_code');
        if (roomCodeDisplay) {
            if (roomCodeDisplay.textContent === "Room is not found") {
                if (changes.roomCode.newValue != null) {
                    roomCodeDisplay.textContent += changes.roomCode.newValue;
                }
            }
        }
    }
});