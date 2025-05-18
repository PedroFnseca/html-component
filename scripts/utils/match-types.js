export function formatMatchTime(match) {
  if (match.live) {
    if (match.time === "HT") {
      return "INTERVALO";
    } else if (match.time.includes("'")) {
      return match.time;
    } else {
      return `${match.time}`;
    }
  } else {
    if (match.time === "Concluído") {
      return "ENCERRADO";
    } else {
      if (match.date) {
        const matchDate = new Date(match.date);
        return matchDate.toLocaleDateString('pt-BR', {
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric'
        });
      } else {
        return match.time;
      }
    }
  }
}

export function getMatchStatusBadge(match) {
  if (match.live) {
    return `<span class="status-badge status-live">AO VIVO</span>`;
  } else if (match.highlights) {
    return `<span class="status-badge status-highlights">MELHORES MOMENTOS</span>`;
  } else if (match.fullMatch) {
    return `<span class="status-badge status-full">PARTIDA COMPLETA</span>`;
  } else {
    return `<span class="status-badge status-replay">REPLAY</span>`;
  }
}

export function getMatchPriority(match) {
  let priority = 0;
  
  if (match.live) priority += 1000;
  
  if (match.featured) priority += 500;
  
  const typeWeights = {
    final: 200,
    knockout: 150,
    derby: 100,
    championship: 50,
    groupStage: 40,
    friendly: 20
  };
  
  priority += typeWeights[match.matchType] || 0;
  
  const leagueWeights = {
    "FIFA World Cup": 300,
    "Champions League": 250,
    "Premier League": 200,
    "La Liga": 200,
    "Bundesliga": 180,
    "Serie A": 180,
    "Copa Libertadores": 170
  };
  
  priority += leagueWeights[match.league] || 0;
  
  return priority;
}

export function formatMatchScore(match) {
  if (match.score && !match.score.includes('(')) {
    return match.score;
  } 
  
  if (match.score && match.score.includes('(')) {
    const [regularScore, penalties] = match.score.split(' ');
    return `
      <span class="regular-score">${regularScore}</span>
      <span class="penalties">${penalties}</span>
    `;
  }
  
  return "vs";
}
