var hidden = false;

if (chrome.browserAction) {
  chrome.browserAction.onClicked.addListener(function (tab) {
  	if (/https\:\/\/.*trello\.com\//.test(tab.url)) {
  	  hidden = !hidden;

  	  var name = hidden ? 'icons/enabled-' : 'icons/disabled-';
  	  chrome.browserAction.setIcon({ path: {
        "16": name + '16.png',
        "48": name + '48.png',
        "128": name + '128.png'
      } });

  	  chrome.tabs.sendMessage(tab.id, { action: 'trello-lists-toogle', hide: hidden });
  	}
  });
}
