chrome.runtime.onMessage.addListener(result =>{

    let player = document.getElementById('info');

    if(result.action == "print Summary"){   
        let st = document.getElementById('Summary');
        st.innerHTML = result.summary;
        st.style.textAlign = "left";
    }

    if(result.action == "Load Summary"){
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