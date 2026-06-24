import { storage } from './storage';

const TOKEN_KEY = 'github_token';
const REPO_OWNER = 'irfan-wahyu';
const REPO_NAME = 'Learn-cybersecurity';
const API_BASE = 'https://api.github.com';

export const githubAPI = {
  // Get stored token
  getToken() {
    return storage.get(TOKEN_KEY, '');
  },

  // Save token
  setToken(token) {
    storage.set(TOKEN_KEY, token);
  },

  // Remove token
  removeToken() {
    storage.remove(TOKEN_KEY);
  },

  // Check if token is set
  hasToken() {
    return !!this.getToken();
  },

  // Make API request
  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'GitHub API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API Error:', error);
      throw error;
    }
  },

  // Get file content
  async getFile(path) {
    try {
      const data = await this.request(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`);
      const content = atob(data.content);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error getting file:', error);
      return null;
    }
  },

  // Update or create file
  async updateFile(path, content, message) {
    const token = this.getToken();
    if (!token) {
      throw new Error('GitHub token not set');
    }

    try {
      // Get current file SHA (needed for update)
      let sha = null;
      try {
        const existing = await this.request(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`);
        sha = existing.sha;
      } catch (e) {
        // File doesn't exist, that's ok
      }

      const body = {
        message,
        content: btoa(JSON.stringify(content, null, 2)),
        ...(sha && { sha })
      };

      const result = await this.request(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
        {
          method: 'PUT',
          body: JSON.stringify(body)
        }
      );

      return result;
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  },

  // Commit progress data
  async commitProgress(progressData) {
    return this.updateFile(
      'data/progress.json',
      progressData,
      'Update learning progress'
    );
  },

  // Commit challenge completion
  async commitChallengeCompletion(challengeId, answer) {
    const timestamp = new Date().toISOString();
    const commitData = {
      challengeId,
      answer,
      timestamp,
      user: 'irfan'
    };

    return this.updateFile(
      `challenges/${challengeId}.json`,
      commitData,
      `Solved challenge: ${challengeId}`
    );
  },

  // Verify token is valid
  async verifyToken() {
    try {
      const data = await this.request('/user');
      return {
        valid: true,
        user: {
          login: data.login,
          name: data.name,
          avatar_url: data.avatar_url
        }
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
};

export default githubAPI;
