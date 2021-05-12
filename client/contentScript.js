chrome.runtime.onMessage.addListener(result =>{

    if(result.action == "print Summary"){   
        let st = document.getElementById('Summary');
        let s = "";
        for(let i = 0; i < result.summary.length; i ++){
            if(result.summary[i] == '\n')
                s += '<br />';
            else
                s += result.summary[i];
        }
        st.innerHTML = s;
        console.log(s);
        st.style.textAlign = "left";
    }

    if(result.action == "Load Summary"){
        let player = document.getElementById('info');
        let txt = document.getElementById('Summary-Box');
        if(txt == null){
            txt = document.createElement("div");
            txt.className = 'style-scope ytd-watch-flexy summary_box';
            txt.id = 'Summary-Box';
            let temp = document.createElement("P");
            temp.id = 'Summary';
            txt.appendChild(temp);
            player.appendChild(txt);
        }
        let st = document.getElementById('Summary');
        st.innerHTML = "Loading Summary.......";
        st.style.textAlign = "center";
    }    
    
    if(result.action == "Initalize"){
        let txt = document.getElementById('Summary-Box');
        txt.remove();
    }
});