chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
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