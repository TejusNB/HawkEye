function reddenPage() {
    console.log("Whooo!");
    document.body.style.backgroundColor = 'red';
    chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
}
  
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: reddenPage
    });
});