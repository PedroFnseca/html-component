document.addEventListener('DOMContentLoaded', function() {
  initVideoManager();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
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
  
  let currentMatch = matches.find(match => match.videoId === currentVideoId);
  if (!currentMatch && matches.length > 0) {
    currentMatch = matches[0];
  }
  
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const title = this.querySelector('h4');
      
      if (!img || !title) return;
      
      const clickedVideoSrc = img.getAttribute('src');
      const clickedMatch = findMatchByThumbnail(matches, clickedVideoSrc);
      
      if (clickedMatch && currentMatch) {
        swapFeaturedVideo(clickedMatch, currentMatch);
        currentMatch = clickedMatch;
      }
    });
  });
}

function swapFeaturedVideo(newFeaturedMatch, oldFeaturedMatch) {
  const featuredVideoIframe = document.querySelector('.video-container iframe');
  const featuredTitle = document.querySelector('.video-container .video-info h2');
  const featuredInfo = document.querySelector('.video-container .video-info p');
  
  if (featuredVideoIframe && featuredTitle && featuredInfo) {
    featuredVideoIframe.setAttribute('src', `https://www.youtube.com/embed/${newFeaturedMatch.videoId}?si=jVomr6WqDGXnbhCX`);
    
    featuredTitle.textContent = newFeaturedMatch.title;
    
    if (newFeaturedMatch.live) {
      featuredInfo.textContent = `Ao vivo • ${newFeaturedMatch.viewers} espectadores`;
    } else {
      featuredInfo.textContent = `${newFeaturedMatch.viewers} visualizações • Partida finalizada`;
    }
  }
  
  const clickedVideoCard = findVideoCardByMatch(newFeaturedMatch);
  
  if (clickedVideoCard) {
    const cardImg = clickedVideoCard.querySelector('img');
    const cardTitle = clickedVideoCard.querySelector('h4');
    const cardInfo = clickedVideoCard.querySelector('p');
    
    if (cardImg && cardTitle && cardInfo) {
      cardImg.setAttribute('src', oldFeaturedMatch.thumbnail);
      cardTitle.textContent = oldFeaturedMatch.title;
      
      if (oldFeaturedMatch.live) {
        cardInfo.textContent = `Ao vivo • ${oldFeaturedMatch.viewers} espectadores`;
      } else {
        cardInfo.textContent = `${oldFeaturedMatch.viewers} visualizações • Partida finalizada`;
      }
    }
  }
}

function findMatchByThumbnail(matches, thumbnailSrc) {
  return matches.find(match => match.thumbnail === thumbnailSrc);
}

function findVideoCardByMatch(match) {
  const videoCards = document.querySelectorAll('.video-card');
  
  for (let i = 0; i < videoCards.length; i++) {
    const card = videoCards[i];
    const title = card.querySelector('h4');
    
    if (title && title.textContent === match.title) {
      return card;
    }
  }
  
  return null;
}

function extractVideoId(videoUrl) {
  if (!videoUrl) return null;
  
  const regex = /embed\/([^?&]+)/;
  const match = videoUrl.match(regex);
  
  return match ? match[1] : null;
}
