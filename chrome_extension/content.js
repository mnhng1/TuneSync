function getYouTubeVideoData() {
    let video = document.querySelector('video');
    if (!video) return null;
    
    let title = document.querySelector('.title.style-scope.ytd-video-primary-info-renderer')?.innerText || '';
    let thumbnailUrl = document.querySelector('.ytp-cued-thumbnail-overlay-image')?.style.backgroundImage.slice(5, -2) || '';
    let currentTime = video.currentTime;
    let state = video.paused ? 'paused' : 'playing';
    
    return { title, thumbnailUrl, currentTime, state };
}



window.addEventListener('message', async function(event) {
    if (event.source !== window) return; // Only accept messages from the same window
    
    if (event.data && event.data.roomCode) {

        console.log('Received room code from extension:', event.data.roomCode);
        socket = new WebSocket(`ws://127.0.0.1:8000/ws/room/youtube/${event.data.roomCode}`);
        
        socket.onopen = function() {
            console.log("WebSocket connection established.");
            socket.send(JSON.stringify({message: "Hello from the extension!"}));
        };
    
        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log("Received message: ", data);
        }
            
    
        socket.onclose = function(event) {
            console.log("WebSocket connection closed: ", event);
        };
    
        socket.onerror = function(error) {
            console.error("WebSocket error: ", error);
        };
        
         
        
        
    } else{
        return}
});


