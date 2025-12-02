// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "setSpeed") {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.playbackRate = request.speed;
        });
        console.log(`Video speed set to ${request.speed}x`);
    }
});

console.log("Video Speed Controller content script loaded");
