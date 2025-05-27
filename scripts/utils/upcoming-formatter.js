import { formatMatchDate, formatMatchTime } from './date-formatter.js';

// Caching for league data
let categoriesCache = null;
let clubsCache = null;

async function fetchCategories() {
  if (categoriesCache) return categoriesCache;
  
  try {
    const response = await fetch('/data/categories.json');
    const data = await response.json();
    categoriesCache = data.categories;
    return categoriesCache;
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    return [];
  }
}

async function fetchClubs() {
  if (clubsCache) return clubsCache;
  
  try {
    const response = await fetch('/data/clubs.json');
    const data = await response.json();
    clubsCache = data.clubs;
    return clubsCache;
  } catch (error) {
    console.error('Erro ao carregar dados dos clubes:', error);
    return [];
  }
}

function getTeamSlug(teamName) {
  return teamName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '');
}

async function getTeamImageUrl(teamName) {
  try {
    const clubs = await fetchClubs();
    const club = clubs.find(c => c.name.toLowerCase() === teamName.toLowerCase());
    
    if (club && club.imageUrl) {
      return club.imageUrl;
    }
    
    // Fallback to the old way if not found in clubs.json
    return `/assets/teams/${getTeamSlug(teamName)}.png`;
  } catch (error) {
    console.error('Erro ao buscar imagem do time:', error);
    return `/assets/teams/${getTeamSlug(teamName)}.png`;
  }
}

export async function renderUpcomingMatch(match) {
  const matchDate = formatMatchDate(match.scheduledDate);
  const matchTime = formatMatchTime(match.scheduledDate);
  
  const categories = await fetchCategories();
  const leagueData = categories.find(category => 
    category.name.toLowerCase() === match.league.toLowerCase()
  );
  
  const leagueImageUrl = leagueData?.imageUrl || '/assets/categories/default.png';
  
  // Get team image URLs
  const team1ImageUrl = await getTeamImageUrl(match.teams[0]);
  const team2ImageUrl = await getTeamImageUrl(match.teams[1]);
  
  return `
    <div class="upcoming-match-card" data-match-id="${match.id}">
      <div class="upcoming-match-header">
        <img src="${leagueImageUrl}" 
             onerror="this.src='/assets/categories/default.png'" 
             alt="${match.league}" 
             class="league-logo">
        <span class="match-league">${match.league}</span>
        <span class="match-date">${matchDate}</span>
      </div>
      
      <div class="match-details">
        <div class="teams-container">
          <div class="team-info">
            <img src="${team1ImageUrl}" 
                 onerror="this.src='/assets/teams/default.png'" 
                 alt="${match.teams[0]}" 
                 class="team-logo">
            <h4>${match.teams[0]}</h4>
          </div>
          
          <div class="match-time">
            <span class="vs">VS</span>
            <span class="time">${matchTime}</span>
          </div>
          
          <div class="team-info">
            <img src="${team2ImageUrl}" 
                 onerror="this.src='/assets/teams/default.png'" 
                 alt="${match.teams[1]}" 
                 class="team-logo">
            <h4>${match.teams[1]}</h4>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getLeagueSlug(leagueName) {
  if (!leagueName) return 'default';
  
  return leagueName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '');
}
