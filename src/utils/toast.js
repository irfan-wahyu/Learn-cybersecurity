// Toast notification system
const TOAST_DURATION = 3000;
const TOAST_CONTAINER_ID = 'toast-container';

const TOAST_ICONS = {
  success: '✓',
  error: '✗',
  info: 'ℹ',
  warning: '⚠',
  xp: '⚡'
};

const TOAST_COLORS = {
  success: 'var(--success)',
  error: 'var(--danger)',
  info: 'var(--info)',
  warning: 'var(--warning)',
  xp: 'var(--warning)'
};

export function showToast(message, type = 'info', duration = TOAST_DURATION) {
  const container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon" style="color: ${TOAST_COLORS[type]}">${TOAST_ICONS[type]}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function showXPToast(amount, message = '') {
  const text = message || `+${amount} XP earned!`;
  showToast(text, 'xp', 4000);
}

export function showSuccessToast(message) {
  showToast(message, 'success');
}

export function showErrorToast(message) {
  showToast(message, 'error');
}

export function showInfoToast(message) {
  showToast(message, 'info');
}

export default {
  showToast,
  showXPToast,
  showSuccessToast,
  showErrorToast,
  showInfoToast
};
