const cookieName = 'ext-hide-empty-lists';

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  if (typeof options.expires == 'number' && options.expires) {
    const date = new Date();

    date.setTime(date.getTime() + expires * 1000);
    options.expires = date;
  }

  if (options.expires && options.expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  const encodedValue = encodeURIComponent(value);
  const updatedCookie = name + "=" + encodedValue;

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function getCurrentValue() {
  return getCookie(cookieName);
}

function show() {
  document.querySelectorAll('.js-list.list-wrapper').forEach((list) => {
    list.classList.remove('hide');
  });
}

function hide() {
  document.querySelectorAll('.js-list.list-wrapper').forEach((list) => {
    const cards = list.querySelectorAll('.list-card:not(.hide)');

    if (cards.length === 0) {
      list.classList.add('hide');
    } else {
      list.classList.remove('hide');
    }
  });
}

function showOrHide(value) {
  if (value) {
    hide();
  } else {
    show();
  }
}

document.addEventListener('DOMNodeInserted', (event) => {
  const node = event.target;
  const classList = node.classList;

  if (classList && classList.contains('list-card')) {
    showOrHide(getCurrentValue() === 'true');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'get') {
    sendResponse(getCurrentValue());

    return;
  }

	if (request.action === 'hide') {
    showOrHide(request.hide);
    setCookie(cookieName, request.hide);

    return;
	}
});
