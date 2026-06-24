import { storage } from './storage';

const XP_KEY = 'xp';
const LEVELS_KEY = 'levels';

// XP thresholds for each level
const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1800, 2500, 3500, 5000,
  7000, 10000, 14000, 19000, 25000, 32000, 40000, 50000, 65000, 80000
];

// Level titles
const LEVEL_TITLES = [
  'Newbie', 'Script Kiddie', 'Junior Hacker', 'Security Analyst',
  'Penetration Tester', 'Security Engineer', 'Bug Hunter', 'Red Teamer',
  'Security Architect', 'Security Expert', 'Bug Bounty Hunter',
  'CISO', 'Security Researcher', 'Cyber Warrior', 'Elite Hacker',
  'Security Legend', 'Cyber God', '1337 Hacker', 'Security Master',
  'Ultimate Hacker'
];

export const xpSystem = {
  // Get current XP
  getXP() {
    return storage.get(XP_KEY, 0);
  },

  // Add XP and check for level up
  addXP(amount) {
    const currentXP = this.getXP();
    const newXP = currentXP + amount;
    storage.set(XP_KEY, newXP);

    const oldLevel = this.getLevel();
    const newLevel = this.getLevelFromXP(newXP);

    if (newLevel > oldLevel) {
      return { levelUp: true, newLevel, xp: newXP };
    }

    return { levelUp: false, xp: newXP };
  },

  // Get current level from XP
  getLevelFromXP(xp) {
    let level = 0;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        level = i + 1;
      } else {
        break;
      }
    }
    return level;
  },

  // Get current level
  getLevel() {
    const xp = this.getXP();
    return this.getLevelFromXP(xp);
  },

  // Get level title
  getLevelTitle() {
    const level = this.getLevel();
    return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  },

  // Get XP progress to next level
  getProgress() {
    const xp = this.getXP();
    const currentLevel = this.getLevel();

    if (currentLevel >= LEVEL_THRESHOLDS.length) {
      return { percentage: 100, current: xp, needed: 0 };
    }

    const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1] || 0;
    const nextThreshold = LEVEL_THRESHOLDS[currentLevel];
    const xpInLevel = xp - currentThreshold;
    const xpNeeded = nextThreshold - currentThreshold;

    return {
      percentage: Math.min(100, (xpInLevel / xpNeeded) * 100),
      current: xpInLevel,
      needed: xpNeeded
    };
  },

  // Get XP badge text
  getBadgeText() {
    const xp = this.getXP();
    if (xp >= 1000) {
      return `${(xp / 1000).toFixed(1)}k XP`;
    }
    return `${xp} XP`;
  }
};

export default xpSystem;
