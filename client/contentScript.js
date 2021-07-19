let time_to_sec = (time) =>{
    let sec = 0, i = 0, ext = 0;
    for(i = 0; i < time.length; i ++){
        if(time[i] == ':'){
            i ++;
            break
        }
        sec *= 10;
        sec += parseInt(time[i]);
    }
    sec *= 60;
    while(i < time.length){
        ext *= 10;
        ext += parseInt(time[i]);
        i ++;
    }
    return sec + ext;
};

let create_box = (box, url, content)=>{
    let time_box = document.createElement("div");
    time_box.appendChild(document.createElement("a"));
    time_box.firstChild.href = url + "&t=" + String(time_to_sec(content.start));
    time_box.firstChild.innerHTML = "[ " + content.start + " - " + content.end + " ]";
    time_box.className = "time-box";
    let content_box = document.createElement("div");
    content_box.className="content-box";
    content_box.appendChild(document.createElement("p"));
    content_box.firstChild.innerHTML = content.text;
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.appendChild(time_box);
    wrapper.appendChild(content_box);
    box.appendChild(wrapper);
};

chrome.runtime.onMessage.addListener(result =>{

    if(result.action == "print Summary"){   
        let box = document.getElementById("Summary-Box");
        box.removeChild(document.getElementById("Load-text"));
        for(let i = 0; i < result.summary.length; i ++){
            create_box(box, result.video_url, (result.summary)[i]);
        }
    }

    if(result.action == "Load Summary"){
        
        let player = document.getElementById('info');
        let txt = document.getElementById('Summary-Box');
        if(txt == null){
            txt = document.createElement("div");
            player.appendChild(txt);
        }
        while(txt.childNodes.length > 0)
            txt.removeChild(txt.firstChild());
        
        txt.className = 'style-scope ytd-watch-flexy summary_box';
        txt.id = "Summary-Box";
        let temp = document.createElement("p");
        temp.id = "Load-text";
        temp.innerHTML = "Loading Summary.......";
        txt.appendChild(temp);
    }    
    
    if(result.action == "Initalize"){
        let txt = document.getElementById('Summary-Box');
        if(txt != null)
            txt.remove();
    }
});