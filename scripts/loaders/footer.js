import loader from './index.js';

function loadFooter() {
  const url = '/components/footer.html';

  loader(url, function (response) {
    const footer = document.querySelector('footer');

    footer.innerHTML = response;
  });
}

loadFooter();
