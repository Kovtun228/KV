// controllers/dashboardControl.js
const db = require('../config/db');

exports.getDashboard = async (req, res) => {
  try {
    // Получение данных о транспортных средствах из базы данных
    const [vehicles] = await db.execute('SELECT * FROM vehicles');
    // Передаем массив vehicles в шаблон
    res.render('dashboard', { title: 'Dashboard', vehicles: vehicles });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send('Internal Server Error');
  }
};
