SummaryButton = document.getElementById('Summarize');
SummaryButton.onclick = e => {
    e.preventDefault();

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {    
        let url = tabs[0].url.split("&")[0];
        var expression = /https?:\/\/(www\.)?youtube.com\/watch\b([v?=].*)/g
        var regex = new RegExp(expression); 

        if(!url.match(regex))
            return;

        chrome.tabs.sendMessage(tabs[0].id, {action:"Load Summary"});
        
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    chrome.tabs.sendMessage(tabs[0].id, {"video_url": url, action:"print Summary", summary: JSON.parse(xhr.response)});            
                }
            }   
        }
        // the api
        xhr.open("GET", 'https://2450-2401-4900-1f3c-4f48-fe17-4f79-96a2-8bf5.ngrok.io/api/summarize?youtube_url=' + url, true);
        xhr.send();
    });
};