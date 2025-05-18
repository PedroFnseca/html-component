import { formatMatchDate, formatMatchTime } from './date-formatter.js';

function getTeamSlug(teamName) {
  return teamName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
}

export function renderUpcomingMatch(match) {
  const matchDate = formatMatchDate(match.scheduledDate);
  const matchTime = formatMatchTime(match.scheduledDate);
  
  return `
    <div class="upcoming-match-card" data-match-id="${match.id}">
      <div class="upcoming-match-header">
        <img src="/assets/leagues/${getLeagueSlug(match.league)}.png" 
             onerror="this.src='/assets/leagues/default.webp'" 
             alt="${match.league}" 
             class="league-logo">
        <span class="match-league">${match.league}</span>
        <span class="match-date">${matchDate}</span>
      </div>
      
      <div class="match-details">
        <div class="teams-container">
          <div class="team-info">
            <img src="/assets/teams/${getTeamSlug(match.teams[0])}.png" 
                 onerror="this.src='/assets/teams/default.webp'" 
                 alt="${match.teams[0]}" 
                 class="team-logo">
            <h4>${match.teams[0]}</h4>
          </div>
          
          <div class="match-time">
            <span class="vs">VS</span>
            <span class="time">${matchTime}</span>
          </div>
          
          <div class="team-info">
            <img src="/assets/teams/${getTeamSlug(match.teams[1])}.png" 
                 onerror="this.src='/assets/teams/default.webp'" 
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
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
}
