'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse();

  document.querySelectorAll('.WebRtcVideo').forEach((parent) => {
    const editable = parent.querySelector('[class*="editableText"]');
    if (!editable) return;

    const video = parent.querySelector('video');
    if (!video) return;

    video.srcObject.getTracks({video: true}).forEach(track => track.enabled = !track.enabled);
  });
});
