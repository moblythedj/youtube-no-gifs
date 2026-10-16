// ==UserScript==
// @name         YouTube: No Comment GIFs
// @namespace    youtube-no-gifs
// @version      1.0
// @description  Hides GIF attachments in YouTube comments and stops them from downloading
// @match        https://www.youtube.com/*
// @run-at       document-start
// @license      MIT
// @grant        none
// @homepageURL  https://github.com/moblythedj/youtube-no-gifs
// @updateURL    https://raw.githubusercontent.com/moblythedj/youtube-no-gifs/main/youtube-no-gifs.user.js
// @downloadURL  https://raw.githubusercontent.com/moblythedj/youtube-no-gifs/main/youtube-no-gifs.user.js
// ==/UserScript==

(function () {
  'use strict';

  const ATTACHMENT = 'ytw-comment-image-attachment-view-model';

  // Hide the attachment box. CSS keeps working across YouTube's in-page navigation.
  const style = document.createElement('style');
  style.textContent = `${ATTACHMENT} { display: none !important; }`;
  (document.head || document.documentElement).appendChild(style);

  // Hidden images still download, so clear their source as soon as one appears.
  const stripImages = (root) => {
    root.querySelectorAll(`${ATTACHMENT} img[src]`).forEach((img) => img.removeAttribute('src'));
  };

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes') {
        if (m.target.closest(ATTACHMENT)) m.target.removeAttribute('src');
      } else {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1) stripImages(node.parentElement || node);
        }
      }
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src'],
  });
})();
