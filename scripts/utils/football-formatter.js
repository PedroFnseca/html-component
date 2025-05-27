import { getThumbnailUrl } from './video.js';
import { 
  formatMatchTime, 
  getMatchStatusBadge,
  formatMatchScore
} from './match-types.js';

let clubsCache = null;

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

async function getTeamImageUrl(teamName) {
  try {
    const clubs = await fetchClubs();
    const club = clubs.find(c => c.name.toLowerCase() === teamName.toLowerCase());
    
    if (club && club.imageUrl) {
      return club.imageUrl;
    }
    return `/assets/teams/${getTeamSlug(teamName)}.png`;
  } catch (error) {
    console.error('Erro ao buscar imagem do time:', error);
    return `/assets/teams/${getTeamSlug(teamName)}.png`;
  }
}

export function formatMatchStats(match) {
  if (match.live) {
    return `${match.viewers} espectadores • ${formatMatchScore(match)} (${formatMatchTime(match)})`;
  } else {
    return `${match.viewers} visualizações • ${formatMatchTime(match)}`;
  }
}

export function getLeagueBadge(match) {
  const leagueClass = match.league ? match.league.toLowerCase().replace(/\s+/g, '_') : 'generic';
  return `<span class="league-badge ${leagueClass}">${match.league || 'Amistoso'}</span>`;
}

export function renderMatchCard(match) {
  const statusBadge = getMatchStatusBadge(match);
  
  return `
    <a href="watch.html?id=${match.videoId}" class="stream-card">
      <div class="thumbnail">
        <img src="${getThumbnailUrl(match.videoId)}" alt="${match.title}">
        ${getLeagueBadge(match)}
        ${statusBadge}
        <span class="match-result">${formatMatchScore(match)}</span>
      </div>
      <div class="stream-info">
        <div class="stream-details">
          <h3>${match.teams.join(' vs ')}</h3>
          <p class="match-competition">${match.league || 'Amistoso'}</p>
          <p class="video-stats">${formatMatchStats(match)}</p>
        </div>
      </div>
    </a>
  `;
}

export async function renderLiveMatch(match) {
  const scores = match.score.split('-');
  const homeScore = scores[0].trim();
  const awayScore = scores[1] ? scores[1].trim() : '0';
  
  const team1ImageUrl = await getTeamImageUrl(match.teams[0]);
  const team2ImageUrl = await getTeamImageUrl(match.teams[1]);
  
  return `
    <a href="watch.html?id=${match.videoId}" class="stream-card live-match">
      <div class="thumbnail">
        <img src="${getThumbnailUrl(match.videoId)}" alt="${match.title}">
        <span class="live-badge pulsing">AO VIVO</span>
        <span class="viewer-count"><i class="fas fa-eye"></i> ${match.viewers}</span>
      </div>
      <div class="stream-info">
        <div class="match-header">
          <div class="match-status">
            <span class="live-indicator"></span>
            <span class="match-time">${match.time}</span>
          </div>
        </div>
        <div class="match-details">
          <div class="team-row">
            <img src="${team1ImageUrl}" onerror="this.src='/assets/teams/default.png'" alt="${match.teams[0]}" class="team-badge">
            <p class="team-name">${match.teams[0]}</p>
            <span class="team-score">${homeScore}</span>
          </div>
          <div class="team-row">
            <img src="${team2ImageUrl}" onerror="this.src='/assets/teams/default.png'" alt="${match.teams[1]}" class="team-badge">
            <p class="team-name">${match.teams[1]}</p>
            <span class="team-score">${awayScore}</span>
          </div>
        </div>
      </div>
    </a>
  `;
}

export async function renderFeaturedMatch(match) {
  const scores = match.score.split('-');
  const homeScore = scores[0].trim();
  const awayScore = scores[1] ? scores[1].trim() : '0';
  
  const team1ImageUrl = await getTeamImageUrl(match.teams[0]);
  const team2ImageUrl = await getTeamImageUrl(match.teams[1]);
  
  return `
    <div class="banner-slide active" data-match-id="${match.id}">
      ${match.live ? '<span class="live-badge pulsing">AO VIVO</span>' : ''}
      <img
        src="${getThumbnailUrl(match.videoId)}"
        alt="${match.title}"
        class="banner-image" />
      <div class="banner-info">
        <div class="banner-content">
          <div class="banner-text">
            <div class="banner-teams">
              <img src="${team1ImageUrl}" onerror="this.src='/assets/teams/default.png'" class="team-badge">
              <span class="banner-score">${homeScore} - ${awayScore}</span>
              <img src="${team2ImageUrl}" onerror="this.src='/assets/teams/default.png'" class="team-badge">
            </div>
          </div>
          <div class="banner-action">
            <a href="watch.html?id=${match.videoId}" class="watch-now-btn">Assistir agora</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getTeamSlug(teamName) {
  return teamName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '');
}
