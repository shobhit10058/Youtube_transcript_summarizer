SummaryButton = document.getElementById('Summarize');
SummaryButton.onclick = e => {
    e.preventDefault();

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {    
        let url = tabs[0].url;
        let patt = "*://www.youtube.com/watch?v=*";

        if(patt.test(url) == false)
            return;

        chrome.tabs.sendMessage(tabs[0].id, {action:"Load Summary"});
        
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log(xhr.responseText);
                    chrome.tabs.sendMessage(tabs[0].id, {action:"print Summary", summary: xhr.responseText});            
                }
            }   
        }
        // the api
        xhr.open("GET", 'https://915557d30e19.ngrok.io/api/summarize?youtube_url=' + url, true);
        xhr.send();
    });
};