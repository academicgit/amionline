const statusDisplay = document.getElementById("status")
const background = document.getElementById("body")
const intervalSelector = document.getElementById("testInterval")
const refreshButton = document.getElementById("main")
var interval = intervalSelector.value;

const checkOnlineStatus = async() =>{
    try
    {
        const online = await fetch("images/tinygif.gif", {cache: "no-cache"})
        return online.status >= 200 && online.status < 300
    }
    catch (err)
    {
        return false;
    }
};

const updateStatus = async() =>{
    statusDisplay.innerHTML = "Connecting"
    background.style.backgroundColor = "#e0b124"
    const result = await checkOnlineStatus();
    statusDisplay.innerHTML = result ? "Online" : "Offline"
    background.style.backgroundColor = result ? "#20ab3a" : "#bf3a22"
};

function changeInterval(){
    interval = intervalSelector.value;
    if (interval != 0){
        currentInterval = setInterval(getStatus, interval);
    }
};

function getStatus(){
    clearInterval(currentInterval);
    updateStatus();
    changeInterval();
};

refreshButton.addEventListener("click", getStatus);
intervalSelector.addEventListener("change", getStatus);

var currentInterval = setInterval(getStatus, interval);
getStatus();