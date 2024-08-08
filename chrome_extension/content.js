function getCurrentState() {
    const video = document.querySelector('video');
    return {
      isPlaying: !video.paused,
      currentTime: video.currentTime,
      duration: video.duration,
      volume: video.volume,
      title: document.querySelector('.title').textContent
    };
  }
  
  function controlPlayback(action) {
    const video = document.querySelector('video');
    switch(action) {
      case 'play':
        video.play();
        break;
      case 'pause':
        video.pause();
        break;
      case 'next':
        document.querySelector('.ytp-next-button').click();
        break;
      case 'prev':
        document.querySelector('.ytp-prev-button').click();
        break;
      case 'volumeUp':
        video.volume = Math.min(video.volume + 0.1, 1);
        break;
      case 'volumeDown':
        video.volume = Math.max(video.volume - 0.1, 0);
        break;
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getState') {
      sendResponse(getCurrentState());
    } else {
      controlPlayback(request.action);
      sendResponse({success: true});
    }
  });



  let playlist = [];

function searchYouTube(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    fetch(searchUrl)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const videoElements = doc.querySelectorAll('div#contents ytd-video-renderer');
        const results = Array.from(videoElements).slice(0, 5).map(el => ({
          title: el.querySelector('#video-title').textContent.trim(),
          url: 'https://www.youtube.com' + el.querySelector('#video-title').getAttribute('href'),
          id: el.querySelector('#video-title').getAttribute('href').split('v=')[1],
          thumbnail: el.querySelector('#img').getAttribute('src')
        }));
        resolve(results);
      })
      .catch(reject);
  });
}

function addToPlaylist(videoId) {
  playlist.push(videoId);
}

function removeFromPlaylist(index) {
  playlist.splice(index, 1);
}

function getPlaylist() {
  return playlist;
}

function playNext() {
  if (playlist.length > 0) {
    const nextVideoId = playlist.shift();
    location.href = `https://www.youtube.com/watch?v=${nextVideoId}`;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.action) {
    case 'getState':
      sendResponse(getCurrentState());
      break;
    case 'search':
      searchYouTube(request.query).then(sendResponse);
      return true; // Indicates an asynchronous response
    case 'addToPlaylist':
      addToPlaylist(request.videoId);
      sendResponse({success: true, playlist: playlist});
      break;
    case 'removeFromPlaylist':
      removeFromPlaylist(request.index);
      sendResponse({success: true, playlist: playlist});
      break;
    case 'getPlaylist':
      sendResponse(getPlaylist());
      break;
    case 'playNext':
      playNext();
      sendResponse({success: true});
      break;
    default:
      controlPlayback(request.action);
      sendResponse({success: true});
  }
});

// Add an event listener for when a video ends
document.querySelector('video').addEventListener('ended', playNext);