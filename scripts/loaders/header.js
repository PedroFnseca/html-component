import loader from './index.js';

function loadHeader() {
  const url = '/components/header.html';

  loader(url, function (response) {
    const header = document.querySelector('header');
    header.innerHTML = response;
  });
}

loadHeader();
