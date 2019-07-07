let hidden = false;

if (chrome.browserAction) {
  chrome.browserAction.onClicked.addListener((tab) => {
	if (/https\:\/\/.*trello\.com\//.test(tab.url)) {
	  hidden = !hidden;
	  
	  const icon = hidden ? 'icon-enabled.png' : 'icon-disabled.png';
	  chrome.browserAction.setIcon({ path: { "16": icon, "48": icon, "128": icon } });
	  
	  chrome.tabs.sendMessage(tab.id, { action: 'trello-lists-toogle', hide: hidden });
	}
  });
}
