function showLists() {
  document.querySelectorAll('.js-list.list-wrapper').forEach((list) => {
    list.classList.remove('hide');
  });
}

function hideLists() {
  document.querySelectorAll('.js-list.list-wrapper').forEach((list) => {
    const cards = list.querySelectorAll('.list-card:not(.hide)');

    if (cards.length === 0) {
      list.classList.add('hide');
    } else {
      list.classList.remove('hide');
    }
  });
}

if (chrome.runtime) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { action, hide } = request;
	
	if (action === 'trello-lists-toogle') {
	  hide ? hideLists() : showLists();
	}
  });
}
