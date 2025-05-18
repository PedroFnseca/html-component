import { getThumbnailUrl, extractVideoId } from './utils/video.js';

document.addEventListener('DOMContentLoaded', function () {
  initVideoManager();
});

if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  initVideoManager();
}

async function initVideoManager() {
  let matches = [];
  try {
    const matchResponse = await fetch('/data/match-data.json');
    const matchData = await matchResponse.json();
    matches = matchData.matches;
  } catch (error) {
    console.error('Erro ao carregar dados das partidas:', error);
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');

  let currentMatch;

  if (videoId) {
    currentMatch = matches.find((match) => match.videoId === videoId);
  } else {
    currentMatch = matches.find((match) => match.live) || matches[0];
  }

  if (currentMatch) {
    loadVideo(currentMatch);
  }

  setTimeout(() => {
    setupVideoCards(matches, currentMatch);
  }, 500);
}

function loadVideo(match) {
  const videoPlayer = document.getElementById('video-player');
  const videoTitle = document.getElementById('video-title');
  const videoStats = document.getElementById('video-stats');

  if (videoPlayer && videoTitle && videoStats && match) {
    videoPlayer.src = `https://www.youtube.com/embed/${match.videoId}?si=jVomr6WqDGXnbhCX`;

    videoTitle.textContent = match.title;

    if (match.live) {
      videoStats.textContent = `Ao vivo • ${match.viewers} espectadores`;
    } else {
      videoStats.textContent = `${match.viewers} visualizações • ${
        match.time === 'Concluído' ? 'Partida finalizada' : match.time
      }`;
    }

    document.title = `${match.title} - Lepy Streaming`;
  }
}

function setupVideoCards(matches, currentMatch) {
  const featuredVideoIframe = document.querySelector('.video-container iframe');
  if (!featuredVideoIframe) return;

  const currentVideoUrl = featuredVideoIframe.getAttribute('src');
  const currentVideoId = extractVideoId(currentVideoUrl);

  let currentMatch = matches.find((match) => match.videoId === currentVideoId);
  if (!currentMatch && matches.length > 0) {
    currentMatch = matches[0];
  }

  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach((card) => {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      const videoId = this.getAttribute('data-video-id');

      if (!videoId) return;

      const clickedMatch = matches.find((match) => match.videoId === videoId);

      if (clickedMatch) {
        const url = new URL(window.location);
        url.searchParams.set('id', videoId);
        window.history.pushState({}, '', url);

        loadVideo(clickedMatch);
      }
    });
  });
}

function findVideoCardByVideoId(videoId) {
  const videoCards = document.querySelectorAll('.video-card');

  for (let i = 0; i < videoCards.length; i++) {
    const card = videoCards[i];
    const cardVideoId = card.getAttribute('data-video-id');

    if (cardVideoId && cardVideoId === videoId) {
      return card;
    }
  }

  return null;
}

window.addEventListener('popstate', async function () {
  await initVideoManager();
});
