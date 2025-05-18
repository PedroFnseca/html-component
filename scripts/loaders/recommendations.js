import loader from './index.js';
import { getThumbnailUrl } from '../utils/video.js';

async function loadRecommendations() {
  const url = '/components/recommendations.html';
  
  try {
    const matchResponse = await fetch('/data/match-data.json');
    const matchData = await matchResponse.json();
    
    loader(url, function (response) {
      const recommendationsContainer = document.querySelector('.recommendations');
      
      if (recommendationsContainer) {
        recommendationsContainer.innerHTML = response;
        updateRecommendationsWithData(matchData.matches);
      }
    });
  } catch (error) {
    console.error('Erro ao carregar dados das partidas:', error);
    
    loader(url, function (response) {
      const recommendationsContainer = document.querySelector('.recommendations');
      
      if (recommendationsContainer) {
        recommendationsContainer.innerHTML = response;
      }
    });
  }
}

function updateRecommendationsWithData(matches) {
  const recommendedMatches = matches.filter(match => !match.live);
  const videoCards = document.querySelectorAll('.video-card');
  
  videoCards.forEach((card, index) => {
    if (index < recommendedMatches.length) {
      const match = recommendedMatches[index];
      
      const img = card.querySelector('img');
      if (img) {
        img.src = getThumbnailUrl(match.videoId);
        img.alt = match.title;
      }
      
      const title = card.querySelector('h4');
      if (title) {
        title.textContent = match.title;
      }
      
      const info = card.querySelector('p');
      if (info) {
        info.textContent = `${match.viewers} visualizações • ${match.time === 'Concluído' ? 'Partida finalizada' : match.time}`;
      }
      
      card.setAttribute('data-video-id', match.videoId);
    }
  });
}

loadRecommendations();
