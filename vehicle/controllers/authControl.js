const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
      res.redirect('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const users = await User.findByUsername(username);

      if (users.length === 0) {
        return res.redirect('/login');
      }

      const user = users[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.redirect('/login');
      }

      // Сохраняем информацию о пользователе в сессии
      req.session.user = { id: user.id, username: user.username };

      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during session destruction:', err);
        return res.status(500).send('Logout Error');
      }
      res.redirect('/login');
    });
  },

  checkAuth: (req, res, next) => {
    // Проверка, если сессия пользователя существует
    if (req.session.user) {
      return next(); // Пользователь авторизован, продолжаем выполнение
    } else {
      return res.redirect('/login'); // Перенаправляем на страницу логина
    }
  },
};

module.exports = authController;
