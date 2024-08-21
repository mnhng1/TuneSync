

document.getElementById('play').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: function() {
                let video = document.querySelector('video');
                if (video) {
                    if (video.paused) {
                        video.play();
                        console.log(video.duration)
                    } else {
                        video.pause();
                    }
                }
                
            }
        });
    });
});


<iframe width="1038" height="584" src="https://www.youtube.com/embed/Ae-r8hsbPUo" title="Advanced Java Full Course 2023 | Advance Java Tutorial | J2EE, JSP, JDBC, Java API | Simplilearn" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>