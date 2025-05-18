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

  setTimeout(() => {
    setupVideoCards(matches);
  }, 500);
}

function setupVideoCards(matches) {
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
    card.addEventListener('click', function () {
      const videoId = this.getAttribute('data-video-id');

      if (!videoId) return;

      const clickedMatch = matches.find((match) => match.videoId === videoId);

      if (clickedMatch && currentMatch) {
        swapFeaturedVideo(clickedMatch, currentMatch);
        currentMatch = clickedMatch;
      }
    });
  });
}

function swapFeaturedVideo(newFeaturedMatch, oldFeaturedMatch) {
  const featuredVideoIframe = document.querySelector('.video-container iframe');
  const featuredTitle = document.querySelector(
    '.video-container .video-info h2'
  );
  const featuredInfo = document.querySelector('.video-container .video-info p');

  if (featuredVideoIframe && featuredTitle && featuredInfo) {
    featuredVideoIframe.setAttribute(
      'src',
      `https://www.youtube.com/embed/${newFeaturedMatch.videoId}?si=jVomr6WqDGXnbhCX`
    );

    featuredTitle.textContent = newFeaturedMatch.title;

    if (newFeaturedMatch.live) {
      featuredInfo.textContent = `Ao vivo • ${newFeaturedMatch.viewers} espectadores`;
    } else {
      featuredInfo.textContent = `${newFeaturedMatch.viewers} visualizações • Partida finalizada`;
    }
  }

  const clickedVideoCard = findVideoCardByVideoId(newFeaturedMatch.videoId);

  if (clickedVideoCard) {
    const cardImg = clickedVideoCard.querySelector('img');
    const cardTitle = clickedVideoCard.querySelector('h4');
    const cardInfo = clickedVideoCard.querySelector('p');

    if (cardImg && cardTitle && cardInfo) {
      cardImg.setAttribute('src', getThumbnailUrl(oldFeaturedMatch.videoId));
      cardTitle.textContent = oldFeaturedMatch.title;

      if (oldFeaturedMatch.live) {
        cardInfo.textContent = `Ao vivo • ${oldFeaturedMatch.viewers} espectadores`;
      } else {
        cardInfo.textContent = `${oldFeaturedMatch.viewers} visualizações • Partida finalizada`;
      }

      clickedVideoCard.setAttribute('data-video-id', oldFeaturedMatch.videoId);
    }
  }
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
