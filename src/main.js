import './style.css';
import { storage } from './utils/storage.js';
import { xpSystem } from './utils/xp-system.js';
import { initMatrix } from './utils/effects.js';
import { showToast } from './utils/toast.js';
import { showConfetti } from './utils/confetti.js';
import { githubAPI } from './utils/github-api.js';

import curriculumData from './data/curriculum.json';
import challengesData from './data/challenges.json';
import cheatsheetData from './data/cheatsheet.json';

const state = {
  currentPage: 'dashboard',
  curriculum: curriculumData,
  challenges: challengesData,
  cheatsheet: cheatsheetData,
  progress: storage.get('progress', {}),
  solvedChallenges: storage.get('solvedChallenges', []),
  isLoggedIn: storage.get('isLoggedIn', false)
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (state.isLoggedIn) {
    showApp();
  } else {
    showLogin();
  }
});

function showLogin() {
  document.getElementById('app').innerHTML = '';
  
  const loginScreen = document.createElement('div');
  loginScreen.className = 'login-screen';
  loginScreen.innerHTML = `
    <div class="login-box">
      <div class="login-logo">[ <span class="bright">CYBERSEC</span> ]</div>
      <div class="login-subtitle">Learning Portfolio</div>
      
      <input type="password" class="login-input" id="access-code" 
             placeholder="Enter access code" autocomplete="off">
      <button class="login-btn" id="login-btn">ENTER</button>
      <div class="login-error" id="login-error">Invalid access code</div>
      
      <button class="login-guest" id="guest-btn">Continue as Guest</button>
      
      <div class="login-hint">
        Access code is your GitHub token<br>
        Or click "Continue as Guest" for limited access
      </div>
    </div>
  `;
  
  document.body.appendChild(loginScreen);
  
  const input = document.getElementById('access-code');
  const btn = document.getElementById('login-btn');
  const error = document.getElementById('login-error');
  const guestBtn = document.getElementById('guest-btn');
  
  // Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  
  btn.addEventListener('click', handleLogin);
  
  guestBtn.addEventListener('click', () => {
    state.isLoggedIn = true;
    state.isGuest = true;
    storage.set('isLoggedIn', true);
    storage.set('isGuest', true);
    loginScreen.remove();
    showApp();
  });
  
  async function handleLogin() {
    const code = input.value.trim();
    
    if (!code) {
      error.textContent = 'Please enter an access code';
      error.classList.add('show');
      return;
    }
    
    btn.disabled = true;
    btn.textContent = 'VERIFYING...';
    
    // Try as GitHub token
    githubAPI.setToken(code);
    const result = await githubAPI.verifyToken();
    
    if (result.valid) {
      state.isLoggedIn = true;
      state.isGuest = false;
      storage.set('isLoggedIn', true);
      storage.set('isGuest', false);
      loginScreen.remove();
      showApp();
      showToast(`Welcome, ${result.user.login}!`, 'success');
    } else {
      // Try as simple password
      if (code === 'irfan123' || code === 'admin') {
        state.isLoggedIn = true;
        state.isGuest = false;
        storage.set('isLoggedIn', true);
        storage.set('isGuest', false);
        loginScreen.remove();
        showApp();
        showToast('Welcome back, Irfan!', 'success');
      } else {
        githubAPI.removeToken();
        error.textContent = 'Invalid access code';
        error.classList.add('show');
        btn.disabled = false;
        btn.textContent = 'ENTER';
        input.value = '';
        input.focus();
      }
    }
  }
}

function showApp() {
  // Show navbar
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.remove('hidden');
  
  initMatrix();
  initNavigation();
  updateXPBadge();
  renderPage('dashboard');
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      renderPage(page);
      navLinksContainer.classList.remove('active');
    });
  });

  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
  });
}

function renderPage(page) {
  state.currentPage = page;
  const container = document.getElementById(page);
  if (!container) return;
  
  switch (page) {
    case 'dashboard': renderDashboard(container); break;
    case 'path': renderLearningPath(container); break;
    case 'curriculum': renderCurriculum(container); break;
    case 'challenges': renderChallenges(container); break;
    case 'cheatsheet': renderCheatsheet(container); break;
    case 'projects': renderProjects(container); break;
    case 'admin': renderAdmin(container); break;
  }
}

function renderDashboard(container) {
  const xp = xpSystem.getXP();
  const level = xpSystem.getLevel();
  const title = xpSystem.getLevelTitle();
  const progress = xpSystem.getProgress();
  const completedModules = Object.keys(state.progress).filter(k => state.progress[k]).length;
  const totalModules = state.curriculum.phases.reduce((acc, phase) => acc + phase.modules.length, 0);
  const solvedCount = state.solvedChallenges.length;
  const totalChallenges = state.challenges.challenges.length;

  container.innerHTML = `
    <div class="dashboard-welcome">
      <h1 class="welcome-text">Welcome back, <span class="text-white">Irfan</span></h1>
      <p class="welcome-subtitle">Level ${level} ${title} — ${xp} XP accumulated</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">${xp}</div>
        <div class="stat-label">Total XP</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">◉</div>
        <div class="stat-value">${level}</div>
        <div class="stat-label">Level</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">◈</div>
        <div class="stat-value">${completedModules}/${totalModules}</div>
        <div class="stat-label">Modules</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-value">${solvedCount}/${totalChallenges}</div>
        <div class="stat-label">Challenges</div>
      </div>
    </div>

    <div class="progress-section">
      <h2 class="section-title">Progress</h2>
      <div class="progress-container">
        <div class="progress-bar" style="width: ${progress.percentage}%"></div>
      </div>
      <div class="progress-info">
        <span>${progress.current} / ${progress.needed} XP to next level</span>
        <span>${Math.round(progress.percentage)}%</span>
      </div>
    </div>

    <div class="card">
      <h2 class="section-title">Activity</h2>
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-icon">►</div>
          <div class="activity-content">
            <div class="activity-title">Learning journey started</div>
            <div class="activity-time">Just now</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderLearningPath(container) {
  const phases = state.curriculum.phases;
  
  container.innerHTML = `
    <h1 class="section-title">Learning Path</h1>
    <p class="mb-3 text-dim">Complete each phase to unlock the next.</p>
    
    <div class="path-container">
      ${phases.map((phase, index) => {
        const phaseProgress = getPhaseProgress(phase);
        const isLocked = phase.status === 'locked' && index > 0 && !isPhaseCompleted(phases[index - 1]);
        
        return `
          <div class="path-node ${isLocked ? 'locked' : ''} ${phaseProgress === 100 ? 'completed' : ''} ${phase.status === 'active' ? 'active' : ''}" 
               onclick="${isLocked ? '' : `showPhaseDetail('${phase.id}')`}">
            <div class="path-node-header">
              <h3 class="path-node-title">${phase.icon} ${phase.title}</h3>
              <span class="path-node-status ${phaseProgress === 100 ? 'status-completed' : phase.status === 'active' ? 'status-active' : 'status-locked'}">
                ${phaseProgress === 100 ? '✓ DONE' : phase.status === 'active' ? '► ACTIVE' : 'LOCKED'}
              </span>
            </div>
            <p class="path-node-desc">${phase.description}</p>
            <div class="path-node-modules">
              ${phase.modules.slice(0, 3).map(m => `<span class="module-tag">${m.title}</span>`).join('')}
              ${phase.modules.length > 3 ? `<span class="module-tag">+${phase.modules.length - 3}</span>` : ''}
            </div>
          </div>
          ${index < phases.length - 1 ? '<div class="path-connector"></div>' : ''}
        `;
      }).join('')}
    </div>
  `;
}

function renderCurriculum(container) {
  const phases = state.curriculum.phases;
  
  container.innerHTML = `
    <h1 class="section-title">Curriculum</h1>
    
    <div class="curriculum-tabs">
      ${phases.map((phase, index) => `
        <button class="tab-btn ${index === 0 ? 'active' : ''}" data-phase="${phase.id}">
          ${phase.icon} ${phase.title}
        </button>
      `).join('')}
    </div>

    <div class="module-list" id="module-list">
      ${renderModules(phases[0])}
    </div>
  `;

  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const phaseId = btn.dataset.phase;
      const phase = phases.find(p => p.id === phaseId);
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('module-list').innerHTML = renderModules(phase);
      initModuleClicks();
    });
  });

  initModuleClicks();
}

function renderModules(phase) {
  return phase.modules.map(mod => {
    const isCompleted = state.progress[mod.id];
    return `
      <div class="module-item ${isCompleted ? 'completed' : ''}" data-module="${mod.id}">
        <div class="module-checkbox"></div>
        <div class="module-info">
          <div class="module-number">Module ${mod.number}</div>
          <div class="module-title">${mod.title}</div>
        </div>
        <span class="module-xp">${mod.xp} XP</span>
      </div>
      <div class="module-detail" id="detail-${mod.id}">
        <div class="module-content">
          <h3>${mod.title}</h3>
          <p>${mod.content.intro}</p>
          
          <h4 class="mt-2 mb-1">Key Concepts</h4>
          <ul>
            ${mod.content.concepts.map(c => `<li>${c}</li>`).join('')}
          </ul>
          
          ${mod.content.commands.length > 0 ? `
            <h4 class="mt-2 mb-1">Commands</h4>
            <pre><code>${mod.content.commands.map(c => `${c.cmd}\n# ${c.desc}`).join('\n\n')}</code></pre>
          ` : ''}
          
          <h4 class="mt-2 mb-1">Practice</h4>
          <ul>
            ${mod.content.practice.map(p => `<li>${p}</li>`).join('')}
          </ul>
          
          <button class="btn btn-primary mt-2 complete-module-btn" data-module="${mod.id}" data-xp="${mod.xp}">
            ${isCompleted ? '✓ Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function initModuleClicks() {
  document.querySelectorAll('.module-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.complete-module-btn')) return;
      const moduleId = item.dataset.module;
      const detail = document.getElementById(`detail-${moduleId}`);
      detail.classList.toggle('active');
    });
  });

  document.querySelectorAll('.complete-module-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const moduleId = btn.dataset.module;
      const xp = parseInt(btn.dataset.xp);
      completeModule(moduleId, xp);
    });
  });
}

function completeModule(moduleId, xp) {
  if (state.progress[moduleId]) return;
  
  state.progress[moduleId] = true;
  storage.set('progress', state.progress);
  
  const result = xpSystem.addXP(xp);
  updateXPBadge();
  
  showConfetti();
  showToast(`Module completed! +${xp} XP`, 'success');
  
  if (result.levelUp) {
    setTimeout(() => {
      showToast(`Level Up! Level ${result.newLevel}!`, 'xp');
    }, 1000);
  }
  
  renderPage(state.currentPage);
}

function renderChallenges(container) {
  const challenges = state.challenges.challenges;
  
  container.innerHTML = `
    <h1 class="section-title">Challenges</h1>
    
    <div class="challenges-filter">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="easy">Easy</button>
      <button class="filter-btn" data-filter="medium">Medium</button>
      <button class="filter-btn" data-filter="hard">Hard</button>
    </div>

    <div class="challenges-grid" id="challenges-grid">
      ${challenges.map(ch => renderChallengeCard(ch)).join('')}
    </div>
  `;

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filtered = filter === 'all' ? challenges : challenges.filter(ch => ch.difficulty === filter);
      document.getElementById('challenges-grid').innerHTML = filtered.map(ch => renderChallengeCard(ch)).join('');
      initChallengeSubmit();
    });
  });

  initChallengeSubmit();
}

function renderChallengeCard(challenge) {
  const isSolved = state.solvedChallenges.includes(challenge.id);
  
  return `
    <div class="challenge-card ${isSolved ? 'solved' : ''}">
      <span class="challenge-difficulty">${challenge.difficulty}</span>
      <h3 class="challenge-title">${challenge.title}</h3>
      <p class="challenge-desc">${challenge.description}</p>
      <p class="challenge-xp">${challenge.xp} XP</p>
      
      ${!isSolved ? `
        <div class="challenge-input">
          <input type="text" data-challenge="${challenge.id}" placeholder="Enter answer...">
          <button data-submit="${challenge.id}">Submit</button>
        </div>
        <div class="challenge-feedback" id="feedback-${challenge.id}"></div>
      ` : '<p class="text-white mt-1" style="font-size: 0.8rem;">✓ Solved</p>'}
    </div>
  `;
}

function initChallengeSubmit() {
  document.querySelectorAll('[data-submit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const challengeId = btn.dataset.submit;
      submitAnswer(challengeId);
    });
  });

  document.querySelectorAll('[data-challenge]').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitAnswer(input.dataset.challenge);
      }
    });
  });
}

function submitAnswer(challengeId) {
  const challenge = state.challenges.challenges.find(ch => ch.id === challengeId);
  const input = document.querySelector(`[data-challenge="${challengeId}"]`);
  const feedback = document.getElementById(`feedback-${challengeId}`);
  
  const answer = input.value.trim().toLowerCase();
  const correctAnswer = challenge.answer.toLowerCase();
  const altAnswers = (challenge.altAnswers || []).map(a => a.toLowerCase());
  
  if (answer === correctAnswer || altAnswers.includes(answer)) {
    state.solvedChallenges.push(challengeId);
    storage.set('solvedChallenges', state.solvedChallenges);
    
    const result = xpSystem.addXP(challenge.xp);
    updateXPBadge();
    
    feedback.className = 'challenge-feedback show correct';
    feedback.textContent = `✓ Correct! +${challenge.xp} XP`;
    
    showConfetti();
    showToast(`Challenge solved! +${challenge.xp} XP`, 'success');
    
    if (result.levelUp) {
      setTimeout(() => {
        showToast(`Level Up! Level ${result.newLevel}!`, 'xp');
      }, 1000);
    }
    
    setTimeout(() => renderPage('challenges'), 1500);
  } else {
    feedback.className = 'challenge-feedback show incorrect';
    feedback.textContent = '✗ Incorrect. Try again.';
  }
}

function renderCheatsheet(container) {
  const categories = state.cheatsheet.categories;
  const cheats = state.cheatsheet.cheats;
  
  container.innerHTML = `
    <h1 class="section-title">Cheat Sheet</h1>
    
    <div class="cheatsheet-search">
      <input type="text" id="cheatsheet-search" placeholder="Search commands...">
    </div>

    <div class="cheatsheet-categories">
      ${categories.map(cat => `
        <button class="category-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `).join('')}
    </div>

    <div class="cheatsheet-list" id="cheatsheet-list">
      ${cheats.map(cheat => renderCheatItem(cheat)).join('')}
    </div>
  `;

  document.getElementById('cheatsheet-search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = cheats.filter(cheat => 
      cheat.command.toLowerCase().includes(query) ||
      cheat.description.toLowerCase().includes(query)
    );
    document.getElementById('cheatsheet-list').innerHTML = filtered.map(cheat => renderCheatItem(cheat)).join('');
    initCopyCommand();
  });

  container.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filtered = category === 'All' ? cheats : cheats.filter(cheat => cheat.category === category);
      document.getElementById('cheatsheet-list').innerHTML = filtered.map(cheat => renderCheatItem(cheat)).join('');
      initCopyCommand();
    });
  });

  initCopyCommand();
}

function renderCheatItem(cheat) {
  return `
    <div class="cheat-item">
      <div class="cheat-header">
        <code class="cheat-command">${cheat.command}</code>
        <span class="cheat-category">${cheat.category}</span>
      </div>
      <p class="cheat-desc">${cheat.description}</p>
    </div>
  `;
}

function initCopyCommand() {
  document.querySelectorAll('.cheat-command').forEach(cmd => {
    cmd.addEventListener('click', () => {
      navigator.clipboard.writeText(cmd.textContent);
      cmd.classList.add('copied');
      const original = cmd.textContent;
      cmd.textContent = 'Copied!';
      setTimeout(() => {
        cmd.classList.remove('copied');
        cmd.textContent = original;
      }, 1000);
    });
  });
}

function renderProjects(container) {
  container.innerHTML = `
    <h1 class="section-title">Projects</h1>
    <p class="mb-3 text-dim">Showcase your work and achievements.</p>
    
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-image">🔐</div>
        <div class="project-content">
          <h3 class="project-title">Network Scan Report</h3>
          <p class="project-desc">Nmap scan of local network with service detection.</p>
          <div class="project-tags">
            <span class="project-tag">Nmap</span>
            <span class="project-tag">Networking</span>
          </div>
        </div>
      </div>
      
      <div class="project-card">
        <div class="project-image">💀</div>
        <div class="project-content">
          <h3 class="project-title">Password Cracking Lab</h3>
          <p class="project-desc">Hash cracking practice with John the Ripper.</p>
          <div class="project-tags">
            <span class="project-tag">John</span>
            <span class="project-tag">Crypto</span>
          </div>
        </div>
      </div>
      
      <div class="project-card">
        <div class="project-image">🌐</div>
        <div class="project-content">
          <h3 class="project-title">Web App Testing</h3>
          <p class="project-desc">Security assessment of a vulnerable web application.</p>
          <div class="project-tags">
            <span class="project-tag">Burp Suite</span>
            <span class="project-tag">Web</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdmin(container) {
  const hasToken = githubAPI.hasToken();
  
  container.innerHTML = `
    <h1 class="section-title">Admin Panel</h1>
    
    ${!hasToken ? `
      <div class="admin-login">
        <div class="card">
          <h3 class="mb-2" style="color: var(--white);">GitHub Authentication</h3>
          <p class="mb-2 text-dim" style="font-size: 0.8rem;">Connect your GitHub account to sync progress.</p>
          
          <div class="form-group">
            <label>GitHub Token</label>
            <input type="password" id="github-token" placeholder="ghp_xxxxxxxxxxxx">
            <small>Settings → Developer settings → Personal access tokens</small>
          </div>
          
          <button class="btn btn-primary" id="connect-btn">Connect</button>
        </div>
      </div>
    ` : `
      <div class="admin-panel active">
        <div class="flex-between mb-2">
          <p class="text-white" style="font-size: 0.85rem;">✓ Connected to GitHub</p>
          <button class="btn" id="disconnect-btn">Disconnect</button>
        </div>
        
        <div class="admin-tabs">
          <button class="admin-tab active" data-tab="progress">Progress</button>
          <button class="admin-tab" data-tab="challenges">Challenges</button>
          <button class="admin-tab" data-tab="settings">Settings</button>
        </div>
        
        <div class="admin-content" id="admin-content">
          <h3 class="mb-2" style="color: var(--white);">Sync Progress</h3>
          <p class="mb-2 text-dim" style="font-size: 0.8rem;">Save your learning progress to GitHub.</p>
          <button class="btn btn-primary" id="sync-btn">Sync to GitHub</button>
        </div>
      </div>
    `}
  `;

  const connectBtn = document.getElementById('connect-btn');
  if (connectBtn) {
    connectBtn.addEventListener('click', connectGitHub);
  }

  const disconnectBtn = document.getElementById('disconnect-btn');
  if (disconnectBtn) {
    disconnectBtn.addEventListener('click', disconnectGitHub);
  }

  const syncBtn = document.getElementById('sync-btn');
  if (syncBtn) {
    syncBtn.addEventListener('click', syncProgress);
  }

  container.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

async function connectGitHub() {
  const tokenInput = document.getElementById('github-token');
  const token = tokenInput.value.trim();
  const btn = document.getElementById('connect-btn');
  
  if (!token) {
    showToast('Please enter a token', 'error');
    return;
  }
  
  btn.disabled = true;
  btn.textContent = 'VERIFYING...';
  
  githubAPI.setToken(token);
  const verification = await githubAPI.verifyToken();
  
  if (verification.valid) {
    showToast(`Connected as ${verification.user.login}!`, 'success');
    renderPage('admin');
  } else {
    githubAPI.removeToken();
    showToast('Invalid token', 'error');
    btn.disabled = false;
    btn.textContent = 'CONNECT';
  }
}

function disconnectGitHub() {
  githubAPI.removeToken();
  showToast('Disconnected from GitHub', 'info');
  renderPage('admin');
}

async function syncProgress() {
  try {
    const progressData = {
      user: 'irfan',
      lastUpdated: new Date().toISOString(),
      xp: xpSystem.getXP(),
      level: xpSystem.getLevel(),
      completedModules: state.progress,
      solvedChallenges: state.solvedChallenges
    };
    
    await githubAPI.commitProgress(progressData);
    showToast('Progress synced to GitHub!', 'success');
  } catch (error) {
    showToast('Failed to sync: ' + error.message, 'error');
  }
}

function getPhaseProgress(phase) {
  const completed = phase.modules.filter(m => state.progress[m.id]).length;
  return (completed / phase.modules.length) * 100;
}

function isPhaseCompleted(phase) {
  return phase.modules.every(m => state.progress[m.id]);
}

function updateXPBadge() {
  const badge = document.getElementById('xp-badge');
  if (badge) {
    badge.textContent = xpSystem.getBadgeText();
  }
}

window.showPhaseDetail = (phaseId) => {
  console.log('Phase clicked:', phaseId);
};

window.logout = () => {
  storage.remove('isLoggedIn');
  storage.remove('isGuest');
  state.isLoggedIn = false;
  location.reload();
};
