document.addEventListener('DOMContentLoaded', () => {
  initBannerSlider();
  initCardInteractions();
});

function initBannerSlider() {
  const slider = document.querySelector('.banner-slider');
  if (!slider) return;
}

function initCardInteractions() {
  document.addEventListener('click', function (event) {
    const card = event.target.closest('.stream-card, .category-card');
    if (!card) return;

    card.classList.add('card-active');

    setTimeout(() => {
      card.classList.remove('card-active');
    }, 200);
  });
}

export { initBannerSlider, initCardInteractions };
