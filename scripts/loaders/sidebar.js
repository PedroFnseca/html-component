import loader from './index.js';

function loadSidebar() {
  const url = '/components/sidebar.html';

  loader(url, function (response) {
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
      sidebar.innerHTML = response;
    }
  });
}

loadSidebar();
