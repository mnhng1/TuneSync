chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
      chrome.tabs.query({url: "*://www.youtube.com/*"}, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, request, sendResponse);
        } else {
          sendResponse({error: "No YouTube tab found"});
        }
      });
      return true;  // Indicates we will send a response asynchronously
    }
  );