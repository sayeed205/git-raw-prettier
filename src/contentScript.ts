'use strict';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './extra.css';

const codeBlock = document.querySelectorAll('pre')[0];

// get url for file extension for language
const url = window.location.href;

if (
  url.includes('raw.githubusercontent.com') ||
  url.includes('gist.githubusercontent.com')
) {
  // get the file extension
  const fileExtension = url.split('.').pop();

  // set the language for highlight.js as code class="language-<language>"
  codeBlock.classList.add(`language-${fileExtension}`);

  // highlight the code
  hljs.highlightElement(codeBlock);
}

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});
