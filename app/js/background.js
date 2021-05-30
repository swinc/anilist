/* globals chrome, window */
// set rule and listener for extension page action
const targetPagesRule = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'crunchyroll.com' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'netflix.com' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'hulu.com' }
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([targetPagesRule]);
    });
});
// listen for content script message
chrome.runtime.onMessage.addListener(function (payload) {
    window.contentData = payload; // store message
});
