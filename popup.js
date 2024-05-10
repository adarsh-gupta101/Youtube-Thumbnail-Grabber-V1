document.addEventListener('DOMContentLoaded', function () {
    const thumbnailImg = document.getElementById('thumbnail');
    const downloadButton = document.getElementById('download-btn');

    // Get the thumbnail URL from the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                function: getThumbnailUrl
            },
            function (results) {
                const thumbnailUrl = results[0].result;

                if (thumbnailUrl) {
                    thumbnailImg.src = thumbnailUrl;
                    thumbnailImg.style.display = 'block';
                    downloadButton.style.display = 'block';
                    downloadButton.onclick = function () {
                        chrome.downloads.download({
                            url: thumbnailUrl,
                            filename: 'youtube_thumbnail.jpg'
                            
                        });
                    };

                }
            }
        );
    });
});

function getThumbnailUrl() {
    const videoIdMatch = window.location.href.match(/v=([\w-]+)/);
    if (videoIdMatch) {
        return `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
    }
    return null;
}