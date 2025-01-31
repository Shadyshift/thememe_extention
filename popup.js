document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");

    // update
    chrome.storage.local.get("isRunning", (data) => {
        if (data.isRunning) {
            startButton.disabled = true;
            stopButton.disabled = false;
        } else {
            startButton.disabled = false;
            stopButton.disabled = true;
        }
    });

    startButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "start" });
        startButton.disabled = true;
        stopButton.disabled = false;
    });

    stopButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "stop" });
        startButton.disabled = false;
        stopButton.disabled = true;
    });
});
