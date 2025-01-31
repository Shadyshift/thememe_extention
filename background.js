function fetchMeme() {
    fetch("https://meme-api.com/gimme/memes")
        .then(response => response.json())
        .then(data => {
            let memeUrl = data.url;
            chrome.windows.create({ url: memeUrl, type: "popup" });
        })
        .catch(error => console.error("Fout bij het ophalen van memes:", error));
}
//IF YOU ARE READING THIS I JUST WANT TO SAY HI!!!!!!
let memeInterval;

function startMemeLoop() {
    if (!memeInterval) {
        fetchMeme(); // load a meme
        memeInterval = setInterval(fetchMeme, 10000);
        chrome.storage.local.set({ isRunning: true }); 
    }
}

function stopMemeLoop() {
    clearInterval(memeInterval);
    memeInterval = null;
    chrome.storage.local.set({ isRunning: false }); 
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") {
        startMemeLoop();
    } else if (message.action === "stop") {
        stopMemeLoop();
    }
});


chrome.storage.local.get("isRunning", (data) => {
    if (data.isRunning) {
        startMemeLoop();
    }
});
