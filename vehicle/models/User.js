const db = require('../config/db');

const User = {
  create: async (userData) => {
    const { username, password } = userData;
    try {
      await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  findByUsername: async (username) => {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }
};

module.exports = User;
