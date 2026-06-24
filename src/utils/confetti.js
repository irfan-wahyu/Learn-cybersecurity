// Confetti effect for celebrations
const CONFETTI_COLORS = ['#00ff41', '#00ffff', '#ff3860', '#ffbd2e', '#ff6b35'];
const CONFETTI_COUNT = 50;
const CONFETTI_DURATION = 3000;

export function showConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    setTimeout(() => {
      createConfettiPiece(container);
    }, Math.random() * 500);
  }
}

function createConfettiPiece(container) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';

  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 2;
  const size = 5 + Math.random() * 10;

  confetti.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
  `;

  container.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, (delay + duration) * 1000);
}

export default { showConfetti };
