// Main application entry point
import './style.css';
import { storage } from './utils/storage.js';
import { xpSystem } from './utils/xp-system.js';
import { initMatrix } from './utils/effects.js';
import { showToast } from './utils/toast.js';
import { showConfetti } from './utils/confetti.js';
import { githubAPI } from './utils/github-api.js';

// Import data
import curriculumData from './data/curriculum.json';
import challengesData from './data/challenges.json';
import cheatsheetData from './data/cheatsheet.json';

// App state
const state = {
  currentPage: 'dashboard',
  curriculum: curriculumData,
  challenges: challengesData,
  cheatsheet: cheatsheetData,
  progress: storage.get('progress', {}),
  solvedChallenges: storage.get('solvedChallenges', [])
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initNavigation();
  updateXPBadge();
  renderPage('dashboard');
  
  // Check if first visit
  if (!storage.get('visited')) {
    storage.set('visited', true);
    setTimeout(() => {
      showToast('Welcome to CYBERSEC LAB, Irfan! 🎉', 'success', 5000);
      showConfetti();
    }, 500);
  }
});

// Navigation
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Render page
      renderPage(page);
      
      // Close mobile nav
      navLinksContainer.classList.remove('active');
    });
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
  });
}

// Page renderer
function renderPage(page) {
  state.currentPage = page;
  const container = document.getElementById(page);
  
  switch (page) {
    case 'dashboard':
      renderDashboard(container);
      break;
    case 'path':
      renderLearningPath(container);
      break;
    case 'curriculum':
      renderCurriculum(container);
      break;
    case 'challenges':
      renderChallenges(container);
      break;
    case 'cheatsheet':
      renderCheatsheet(container);
      break;
    case 'projects':
      renderProjects(container);
      break;
    case 'admin':
      renderAdmin(container);
      break;
  }
}

// Dashboard
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
      <h1 class="welcome-text">Welcome back, <span class="name">Irfan</span></h1>
      <p class="welcome-subtitle">Level ${level} ${title} | Keep learning, keep growing!</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">${xp}</div>
        <div class="stat-label">Total XP</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-value">${level}</div>
        <div class="stat-label">Level</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-value">${completedModules}/${totalModules}</div>
        <div class="stat-label">Modules Done</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-value">${solvedCount}/${totalChallenges}</div>
        <div class="stat-label">Challenges Solved</div>
      </div>
    </div>

    <div class="progress-section">
      <h2 class="section-title">Level Progress</h2>
      <div class="progress-container">
        <div class="progress-bar" style="width: ${progress.percentage}%"></div>
      </div>
      <div class="progress-info">
        <span>${progress.current} / ${progress.needed} XP to next level</span>
        <span>${Math.round(progress.percentage)}%</span>
      </div>
    </div>

    <div class="card">
      <h2 class="section-title">Recent Activity</h2>
      <div class="activity-list" id="activity-list">
        <div class="activity-item">
          <div class="activity-icon">🚀</div>
          <div class="activity-content">
            <div class="activity-title">Started learning journey</div>
            <div class="activity-time">Just now</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Learning Path
function renderLearningPath(container) {
  const phases = state.curriculum.phases;
  
  container.innerHTML = `
    <h1 class="section-title">Learning Path</h1>
    <p class="mb-3" style="color: var(--text-dim);">Complete each phase to unlock the next. Choose your specialization!</p>
    
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
                ${phaseProgress === 100 ? '✓ COMPLETED' : phase.status === 'active' ? '► IN PROGRESS' : '🔒 LOCKED'}
              </span>
            </div>
            <p class="path-node-desc">${phase.description}</p>
            <div class="path-node-modules">
              ${phase.modules.slice(0, 3).map(m => `<span class="module-tag">${m.title}</span>`).join('')}
              ${phase.modules.length > 3 ? `<span class="module-tag">+${phase.modules.length - 3} more</span>` : ''}
            </div>
          </div>
          ${index < phases.length - 1 ? '<div class="path-connector"></div>' : ''}
        `;
      }).join('')}
    </div>
  `;
}

// Curriculum
function renderCurriculum(container) {
  const phases = state.curriculum.phases;
  
  container.innerHTML = `
    <h1 class="section-title">Curriculum</h1>
    
    <div class="curriculum-tabs">
      ${phases.map((phase, index) => `
        <button class="tab-btn ${index === 0 ? 'active' : ''}" onclick="switchTab('${phase.id}')">
          ${phase.icon} ${phase.title}
        </button>
      `).join('')}
    </div>

    <div class="module-list" id="module-list">
      ${renderModules(phases[0])}
    </div>
  `;

  // Add tab switching function to window
  window.switchTab = (phaseId) => {
    const phase = phases.find(p => p.id === phaseId);
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('module-list').innerHTML = renderModules(phase);
    initModuleClicks();
  };

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
          
          <h4 class="mt-2 mb-1">Key Concepts:</h4>
          <ul>
            ${mod.content.concepts.map(c => `<li>${c}</li>`).join('')}
          </ul>
          
          ${mod.content.commands.length > 0 ? `
            <h4 class="mt-2 mb-1">Commands:</h4>
            <pre><code>${mod.content.commands.map(c => `${c.cmd}\n# ${c.desc}`).join('\n\n')}</code></pre>
          ` : ''}
          
          <h4 class="mt-2 mb-1">Practice:</h4>
          <ul>
            ${mod.content.practice.map(p => `<li>${p}</li>`).join('')}
          </ul>
          
          <button class="btn btn-success mt-2" onclick="completeModule('${mod.id}', ${mod.xp})">
            ${isCompleted ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function initModuleClicks() {
  document.querySelectorAll('.module-item').forEach(item => {
    item.addEventListener('click', () => {
      const moduleId = item.dataset.module;
      const detail = document.getElementById(`detail-${moduleId}`);
      detail.classList.toggle('active');
    });
  });
}

// Complete module
window.completeModule = (moduleId, xp) => {
  if (state.progress[moduleId]) return;
  
  state.progress[moduleId] = true;
  storage.set('progress', state.progress);
  
  const result = xpSystem.addXP(xp);
  updateXPBadge();
  
  showConfetti();
  showToast(`Module completed! +${xp} XP`, 'success');
  
  if (result.levelUp) {
    setTimeout(() => {
      showToast(`🎉 Level Up! You're now Level ${result.newLevel}!`, 'xp', 5000);
    }, 1000);
  }
  
  // Re-render
  renderPage(state.currentPage);
};

// Challenges
function renderChallenges(container) {
  const challenges = state.challenges.challenges;
  
  container.innerHTML = `
    <h1 class="section-title">Challenges</h1>
    
    <div class="challenges-filter">
      <button class="filter-btn active" onclick="filterChallenges('all')">All</button>
      <button class="filter-btn" onclick="filterChallenges('easy')">Easy</button>
      <button class="filter-btn" onclick="filterChallenges('medium')">Medium</button>
      <button class="filter-btn" onclick="filterChallenges('hard')">Hard</button>
    </div>

    <div class="challenges-grid" id="challenges-grid">
      ${challenges.map(ch => renderChallengeCard(ch)).join('')}
    </div>
  `;

  window.filterChallenges = (difficulty) => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filtered = difficulty === 'all' 
      ? challenges 
      : challenges.filter(ch => ch.difficulty === difficulty);
    
    document.getElementById('challenges-grid').innerHTML = 
      filtered.map(ch => renderChallengeCard(ch)).join('');
  };
}

function renderChallengeCard(challenge) {
  const isSolved = state.solvedChallenges.includes(challenge.id);
  
  return `
    <div class="challenge-card ${isSolved ? 'solved' : ''}">
      <span class="challenge-difficulty difficulty-${challenge.difficulty}">
        ${challenge.difficulty}
      </span>
      <h3 class="challenge-title">${challenge.title}</h3>
      <p class="challenge-desc">${challenge.description}</p>
      <p class="challenge-xp">⚡ ${challenge.xp} XP</p>
      
      ${!isSolved ? `
        <div class="challenge-input">
          <input type="text" id="input-${challenge.id}" placeholder="Enter answer...">
          <button onclick="submitAnswer('${challenge.id}')">Submit</button>
        </div>
        <div class="challenge-feedback" id="feedback-${challenge.id}"></div>
      ` : '<p class="text-primary mt-1">✓ Solved!</p>'}
    </div>
  `;
}

// Submit challenge answer
window.submitAnswer = (challengeId) => {
  const challenge = state.challenges.challenges.find(ch => ch.id === challengeId);
  const input = document.getElementById(`input-${challengeId}`);
  const feedback = document.getElementById(`feedback-${challengeId}`);
  
  const answer = input.value.trim().toLowerCase();
  const correctAnswer = challenge.answer.toLowerCase();
  const altAnswers = (challenge.altAnswers || []).map(a => a.toLowerCase());
  
  if (answer === correctAnswer || altAnswers.includes(answer)) {
    // Correct!
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
        showToast(`🎉 Level Up! Level ${result.newLevel}!`, 'xp', 5000);
      }, 1000);
    }
    
    // Update card
    setTimeout(() => {
      renderPage('challenges');
    }, 1500);
  } else {
    // Incorrect
    feedback.className = 'challenge-feedback show incorrect';
    feedback.textContent = '✗ Incorrect. Try again!';
  }
};

// Cheat Sheet
function renderCheatsheet(container) {
  const categories = state.cheatsheet.categories;
  const cheats = state.cheatsheet.cheats;
  
  container.innerHTML = `
    <h1 class="section-title">Cheat Sheet</h1>
    
    <div class="cheatsheet-search">
      <input type="text" id="cheatsheet-search" placeholder="Search commands..." oninput="searchCheatsheet()">
    </div>

    <div class="cheatsheet-categories">
      ${categories.map(cat => `
        <button class="category-btn ${cat === 'All' ? 'active' : ''}" onclick="filterCheatsheet('${cat}')">
          ${cat}
        </button>
      `).join('')}
    </div>

    <div class="cheatsheet-list" id="cheatsheet-list">
      ${cheats.map(cheat => renderCheatItem(cheat)).join('')}
    </div>
  `;

  window.searchCheatsheet = () => {
    const query = document.getElementById('cheatsheet-search').value.toLowerCase();
    const filtered = cheats.filter(cheat => 
      cheat.command.toLowerCase().includes(query) ||
      cheat.description.toLowerCase().includes(query)
    );
    document.getElementById('cheatsheet-list').innerHTML = 
      filtered.map(cheat => renderCheatItem(cheat)).join('');
  };

  window.filterCheatsheet = (category) => {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filtered = category === 'All' 
      ? cheats 
      : cheats.filter(cheat => cheat.category === category);
    
    document.getElementById('cheatsheet-list').innerHTML = 
      filtered.map(cheat => renderCheatItem(cheat)).join('');
  };
}

function renderCheatItem(cheat) {
  return `
    <div class="cheat-item">
      <div class="cheat-header">
        <code class="cheat-command" onclick="copyCommand(this)">${cheat.command}</code>
        <span class="cheat-category">${cheat.category}</span>
      </div>
      <p class="cheat-desc">${cheat.description}</p>
    </div>
  `;
}

// Copy command to clipboard
window.copyCommand = (element) => {
  navigator.clipboard.writeText(element.textContent);
  element.classList.add('copied');
  element.textContent = 'Copied!';
  setTimeout(() => {
    element.classList.remove('copied');
    element.textContent = element.dataset.original || element.textContent;
  }, 1500);
};

// Projects
function renderProjects(container) {
  container.innerHTML = `
    <h1 class="section-title">Projects</h1>
    <p class="mb-3" style="color: var(--text-dim);">Showcase your work and achievements!</p>
    
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-image">🔐</div>
        <div class="project-content">
          <h3 class="project-title">Network Scan Report</h3>
          <p class="project-desc">Completed Nmap scan of local network with service detection.</p>
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
          <p class="project-desc">Practiced hash cracking with John the Ripper.</p>
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
          <p class="project-desc">Basic security assessment of a vulnerable web application.</p>
          <div class="project-tags">
            <span class="project-tag">Burp Suite</span>
            <span class="project-tag">Web Security</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Admin
function renderAdmin(container) {
  const hasToken = githubAPI.hasToken();
  
  container.innerHTML = `
    <h1 class="section-title">Admin Panel</h1>
    
    ${!hasToken ? `
      <div class="admin-login">
        <div class="card">
          <h3 class="card-title mb-2">GitHub Authentication</h3>
          <p class="mb-2" style="color: var(--text-dim);">Connect your GitHub account to sync progress.</p>
          
          <div class="admin-form">
            <div class="form-group">
              <label>GitHub Token (Classic)</label>
              <input type="password" id="github-token" placeholder="ghp_xxxxxxxxxxxx">
              <small style="color: var(--text-dim);">Settings → Developer settings → Personal access tokens → Tokens (classic)</small>
            </div>
            
            <button class="btn btn-success" onclick="connectGitHub()">Connect</button>
          </div>
        </div>
      </div>
    ` : `
      <div class="admin-panel active">
        <div class="flex-between mb-2">
          <p class="text-primary">✓ Connected to GitHub</p>
          <button class="btn" onclick="disconnectGitHub()">Disconnect</button>
        </div>
        
        <div class="admin-tabs">
          <button class="admin-tab active" onclick="switchAdminTab('progress')">Progress</button>
          <button class="admin-tab" onclick="switchAdminTab('challenges')">Challenges</button>
          <button class="admin-tab" onclick="switchAdminTab('settings')">Settings</button>
        </div>
        
        <div class="admin-content" id="admin-content">
          <h3 class="mb-2">Sync Progress</h3>
          <p class="mb-2" style="color: var(--text-dim);">Save your learning progress to GitHub.</p>
          <button class="btn btn-success" onclick="syncProgress()">⬆ Sync to GitHub</button>
        </div>
      </div>
    `}
  `;
}

// Connect GitHub
window.connectGitHub = async () => {
  const tokenInput = document.getElementById('github-token');
  const token = tokenInput.value.trim();
  
  if (!token) {
    showToast('Please enter a token', 'error');
    return;
  }
  
  githubAPI.setToken(token);
  
  const verification = await githubAPI.verifyToken();
  
  if (verification.valid) {
    showToast(`Connected as ${verification.user.login}!`, 'success');
    renderPage('admin');
  } else {
    githubAPI.removeToken();
    showToast('Invalid token. Please check and try again.', 'error');
  }
};

// Disconnect GitHub
window.disconnectGitHub = () => {
  githubAPI.removeToken();
  showToast('Disconnected from GitHub', 'info');
  renderPage('admin');
};

// Sync progress to GitHub
window.syncProgress = async () => {
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
};

// Helper functions
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

// Make functions available globally
window.showPhaseDetail = (phaseId) => {
  // Could open a modal or navigate to detail view
  console.log('Phase clicked:', phaseId);
};
