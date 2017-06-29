document.addEventListener('DOMContentLoaded', () => {
  const hideButton = document.getElementById('hideButton');
  const showButton = document.getElementById('showButton');

  hideButton.addEventListener('click', hideEmptyLists.bind(null, true));
  showButton.addEventListener('click', hideEmptyLists.bind(null, false));

  getCurrentValue();

  function getCurrentValue() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'get' }, switchButtons);
    });
  }

  function switchButtons(hidden) {
    const value = hidden === 'true';

    if (value) {
      hideButton.style.display = 'none';
      showButton.style.display = 'block';
    } else {
      hideButton.style.display = 'block';
      showButton.style.display = 'none';
    }
  }

  function hideEmptyLists(hide) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'hide', hide }, getCurrentValue);
    });
  }
});

