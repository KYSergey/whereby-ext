'use strict';

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {}, () => {});
});

function isWhereBy (url) {
  return /whereby\.com/.exec(url);
}

function updatePageAction (tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (isWhereBy(tab.url)) {
      chrome.pageAction.show(tabId);
    } else {
      chrome.pageAction.hide(tabId);
    }
  });
}

chrome.tabs.onActivated.addListener(({tabId}) => {
  updatePageAction(tabId);
});

chrome.tabs.onUpdated.addListener((tabId) => {
  updatePageAction(tabId);
});
