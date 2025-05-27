import loader from './index.js';

async function loadSidebar() {
  const url = '/components/sidebar.html';

  loader(url, async function (response) {
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
      sidebar.innerHTML = response;
      
      await loadLeagueCategories();
    }
  });
}

async function loadLeagueCategories() {
  try {
    const response = await fetch('/data/categories.json');
    const data = await response.json();
    const categories = data.categories;
    
    updateLeaguesInSidebar(categories);
  } catch (error) {
    console.error('Erro ao carregar categorias de ligas:', error);
  }
}

function updateLeaguesInSidebar(categories) {
  const leaguesSection = document.getElementById('leagues-section');
  if (!leaguesSection) return;
  
  if (categories && categories.length > 0) {
    const leaguesHTML = categories
      .map(category => renderLeagueItem(category))
      .join('');
    
    leaguesSection.innerHTML = leaguesHTML;
  }
}

function renderLeagueItem(league) {
  return `
    <div class="nav-item">
      <img src="${league.imageUrl}" alt="${league.name}" class="league-icon" onerror="this.src='/assets/categories/default.png'">
      <span>${league.name}</span>
    </div>
  `;
}

loadSidebar();
