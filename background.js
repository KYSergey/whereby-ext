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

function injdectContentScript (tab) {
  chrome.app.getDetails().content_scripts[0].js.forEach(script => {
    chrome.tabs.executeScript(tab.id, {file: script});
  });
}

chrome.tabs.onActivated.addListener(({tabId}) => {
  updatePageAction(tabId);
});

chrome.tabs.onUpdated.addListener((tabId) => {
  updatePageAction(tabId);
});

chrome.windows.getAll({populate: true}, (windows) => {
  windows.forEach(window => {
    window.tabs.forEach(tab => {
      if (isWhereBy(tab.url)) {
        injdectContentScript(tab);
      }
    });
  });
});
