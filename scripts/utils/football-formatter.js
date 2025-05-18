import { getThumbnailUrl } from './video.js';
import { 
  formatMatchTime, 
  getMatchStatusBadge,
  formatMatchScore
} from './match-types.js';

export function formatMatchStats(match) {
  if (match.live) {
    return `${match.viewers} espectadores • ${formatMatchScore(match)} (${formatMatchTime(match)})`;
  } else {
    return `${match.viewers} visualizações • ${formatMatchTime(match)}`;
  }
}

export function getLeagueBadge(match) {
  const leagueClass = match.league ? match.league.toLowerCase().replace(/\s+/g, '-') : 'generic';
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

export function renderLiveMatch(match) {
  const scores = match.score.split('-');
  const homeScore = scores[0].trim();
  const awayScore = scores[1] ? scores[1].trim() : '0';
  
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
            <img src="/assets/teams/${getTeamSlug(match.teams[0])}.png" onerror="this.src='/assets/teams/default.webp'" alt="${match.teams[0]}" class="team-badge">
            <p class="team-name">${match.teams[0]}</p>
            <span class="team-score">${homeScore}</span>
          </div>
          <div class="team-row">
            <img src="/assets/teams/${getTeamSlug(match.teams[1])}.png" onerror="this.src='/assets/teams/default.webp'" alt="${match.teams[1]}" class="team-badge">
            <p class="team-name">${match.teams[1]}</p>
            <span class="team-score">${awayScore}</span>
          </div>
        </div>
      </div>
    </a>
  `;
}

export function renderFeaturedMatch(match) {
  const scores = match.score.split('-');
  const homeScore = scores[0].trim();
  const awayScore = scores[1] ? scores[1].trim() : '0';
  
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
              <img src="/assets/teams/${getTeamSlug(match.teams[0])}.png" onerror="this.src='/assets/teams/default.webp'" class="team-badge">
              <span class="banner-score">${homeScore} - ${awayScore}</span>
              <img src="/assets/teams/${getTeamSlug(match.teams[1])}.png" onerror="this.src='/assets/teams/default.webp'" class="team-badge">
            </div>
            <h2 class="banner-title">${match.league}: ${match.teams[0]} vs ${match.teams[1]}</h2>
            <p class="banner-description">${match.live ? 'Ao vivo • ' : ''}${match.viewers} espectadores${match.stadium ? ` • ${match.stadium}` : ''}</p>
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
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
}
