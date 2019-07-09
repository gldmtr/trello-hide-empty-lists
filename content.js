function showLists() {
  document.querySelectorAll('.js-list.list-wrapper').forEach(function (list) {
    list.classList.remove('hide');
  });
}

function hideLists() {
  document.querySelectorAll('.js-list.list-wrapper').forEach(function (list) {
    var cards = list.querySelectorAll('.list-card:not(.hide)');

    if (cards.length === 0) {
      list.classList.add('hide');
    } else {
      list.classList.remove('hide');
    }
  });
}

if (chrome.runtime) {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  	var action = request.action, hide = request.hide;
  	if (action === 'trello-lists-toogle') {
  	  hide ? hideLists() : showLists();
  	}
  });
}
