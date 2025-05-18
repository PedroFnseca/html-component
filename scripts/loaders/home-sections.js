import loader from './index.js';
import { getThumbnailUrl } from '../utils/video.js';
import {
  renderMatchCard,
  renderLiveMatch,
  formatMatchStats,
} from '../utils/football-formatter.js';
import { renderUpcomingMatch } from '../utils/upcoming-formatter.js';
import { isUpcomingMatch } from '../utils/date-formatter.js';

document.addEventListener('DOMContentLoaded', async function () {
  await loadHomeSections();
  loadFootballData();
});

async function loadHomeSections() {
  const sectionsToLoad = [
    { id: 'featured-banner', path: '/components/home/banner.html' },
    { id: 'live-streams-section', path: '/components/home/live-streams.html' },
    { id: 'upcoming-matches-section', path: '/components/home/upcoming-matches.html' },
    { id: 'categories-section', path: '/components/home/categories.html' },
    { id: 'recommendations-section', path: '/components/home/recommendations.html' },
  ];

  await Promise.all(
    sectionsToLoad.map((section) => loadComponent(section.id, section.path))
  );
}

async function loadComponent(containerId, url) {
  return new Promise((resolve) => {
    const container = document.getElementById(containerId);
    if (container) {
      loader(url, function (response) {
        container.innerHTML = response;
        resolve();
      });
    } else {
      console.error(`Elemento #${containerId} não encontrado`);
      resolve();
    }
  });
}

async function loadFootballData() {
  try {
    const footballData = await fetchFootballData();

    const featuredMatch = findFeaturedMatch(footballData);
    const liveMatches = filterLiveMatches(footballData);
    const upcomingMatches = filterUpcomingMatches(footballData);
    const recentMatches = filterRecentMatches(footballData);

    updateBanner(featuredMatch);
    updateLiveMatches(liveMatches);
    updateUpcomingMatches(upcomingMatches);
    updateRecommendedMatches(recentMatches);
  } catch (error) {
    console.error('Erro ao carregar dados de partidas:', error);
  }
}

async function fetchFootballData() {
  const response = await fetch('/data/match-data.json');
  const data = await response.json();
  return data.matches;
}

function findFeaturedMatch(matches) {
  return (
    matches.find((match) => match.live && match.featured) ||
    matches.find((match) => match.live)
  );
}

function filterLiveMatches(matches) {
  return matches.filter((match) => match.live);
}

function filterUpcomingMatches(matches) {
  return matches
    .filter(match => isUpcomingMatch(match))
    .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
}

function filterRecentMatches(matches) {
  return matches
    .filter((match) => !match.live && !isUpcomingMatch(match))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function updateBanner(featuredMatch) {
  if (!featuredMatch) return;

  const bannerImage = document.querySelector('.banner-image');
  const bannerTitle = document.querySelector('.banner-title');
  const bannerDescription = document.querySelector('.banner-description');
  const bannerLink = document.querySelector('.watch-now-btn');

  if (bannerImage && bannerTitle && bannerDescription && bannerLink) {
    bannerImage.src = getThumbnailUrl(featuredMatch.videoId);
    bannerTitle.textContent = featuredMatch.title;
    bannerDescription.textContent = `Ao vivo • ${formatMatchStats(featuredMatch)}`;
    bannerLink.href = `watch.html?id=${featuredMatch.videoId}`;
  }
}

function updateLiveMatches(liveMatches) {
  const liveMatchesGrid = document.getElementById('live-streams-grid');
  if (!liveMatchesGrid) return;

  if (liveMatches.length > 0) {
    liveMatchesGrid.innerHTML = liveMatches
      .map((match) => renderLiveMatch(match))
      .join('');
  } else {
    liveMatchesGrid.innerHTML = '<p class="no-matches">Nenhuma partida ao vivo no momento.</p>';
  }
}

function updateUpcomingMatches(matches) {
  const upcomingMatchesGrid = document.getElementById('upcoming-matches-grid');
  if (!upcomingMatchesGrid) return;

  if (matches.length > 0) {
    upcomingMatchesGrid.innerHTML = matches
      .map((match) => renderUpcomingMatch(match))
      .join('');
      
    initNotificationBells();
  } else {
    upcomingMatchesGrid.innerHTML = '<p class="no-matches">Nenhuma partida agendada no momento.</p>';
  }
}

function updateRecommendedMatches(matches) {
  const recommendedGrid = document.getElementById('recommended-videos-grid');
  if (!recommendedGrid) return;

  if (matches.length > 0) {
    recommendedGrid.innerHTML = matches
      .map((match) => renderMatchCard(match))
      .join('');
  } else {
    recommendedGrid.innerHTML = '<p class="no-matches">Nenhuma partida recente disponível.</p>';
  }
}

function initNotificationBells() {
  document.querySelectorAll('.notification-bell').forEach(bell => {
    bell.addEventListener('click', function() {
      this.classList.toggle('active');
      const matchId = this.closest('.upcoming-match-card').dataset.matchId;
      
      if (this.classList.contains('active')) {
        saveNotificationPreference(matchId, true);
      } else {
        saveNotificationPreference(matchId, false);
      }
    });
  });
}

function saveNotificationPreference(matchId, enabled) {
  const preferences = JSON.parse(localStorage.getItem('matchNotifications') || '{}');
  preferences[matchId] = enabled;
  localStorage.setItem('matchNotifications', JSON.stringify(preferences));
}
