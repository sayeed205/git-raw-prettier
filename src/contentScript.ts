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

  /** */

  // Create a button element for copying the raw code
  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy';
  copyButton.classList.add('copy-button');

  // Append the copy button to the code block
  codeBlock.parentNode?.insertBefore(copyButton, codeBlock.nextSibling);

  // Listen for button click event
  copyButton.addEventListener('click', () => {
    const rawCode = codeBlock.textContent || '';

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = rawCode;
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();
    textarea.setSelectionRange(0, rawCode.length);
    try {
      // Copy the selected text to the clipboard
      //   navigator.clipboard.writeText(textarea.value);

      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);

      // Change the button text temporarily to indicate the code has been copied
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  });

  /** */
}

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
