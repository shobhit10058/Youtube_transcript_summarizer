
const iconRules = [{
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'youtube.com'},
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}];
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules(iconRules);
});
chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
        if (changeInfo.url) {
            chrome.tabs.sendMessage( tabId, {
                action: 'Initalize'
            })
        }
    }
);