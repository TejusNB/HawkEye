let features = {};
const SERVER_URL = 'http://localhost:5000'

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getFeatures"}, function(data) {
        features = data;
    });
});

function setMessage(message){
    document.getElementById('message').innerHTML=message;
}

document.getElementById('checkPage').addEventListener('click', () => {
    setMessage('processing...')
    fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(features)
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        setMessage(res.message)
    }).catch(err => {
        console.log(err);
        setMessage('Error')
    })
})