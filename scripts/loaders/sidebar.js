import loader from './index.js';

async function loadSidebar() {
  const url = '/components/sidebar.html';

  loader(url, async function (response) {
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
      sidebar.innerHTML = response;
      
      await Promise.all([
        loadLeagueCategories(),
        loadClubs()
      ]);
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
      <div class="league-icon-container">
        <img src="${league.imageUrl}" alt="${league.name}" class="league-icon" onerror="this.src='/assets/categories/default.png'">
      </div>
      <span>${league.name}</span>
    </div>
  `;
}

async function loadClubs() {
  try {
    const response = await fetch('/data/clubs.json');
    const data = await response.json();
    const clubs = data.clubs;
    
    updateClubsInSidebar(clubs);
  } catch (error) {
    console.error('Erro ao carregar dados dos clubes:', error);
  }
}

function updateClubsInSidebar(clubs) {
  const clubsSection = document.getElementById('clubs-section');
  if (!clubsSection) return;
  
  if (clubs && clubs.length > 0) {
    const clubsHTML = clubs
      .map(club => renderClubItem(club))
      .join('');
    
    clubsSection.innerHTML = clubsHTML;
  }
}

function renderClubItem(club) {
  return `
    <div class="nav-item">
      <div class="club-icon-container">
        <img src="${club.imageUrl}" alt="${club.name}" class="club-icon" onerror="this.src='/assets/clubs/default.png'">
      </div>
      <span>${club.name}</span>
    </div>
  `;
}

loadSidebar();
