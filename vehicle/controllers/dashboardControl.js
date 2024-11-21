const db = require('../config/db');

exports.getDashboard = async (req, res) => {
  try {
    const [vehicles] = await db.execute('SELECT * FROM vehicles');
    res.render('dashboard', { title: 'Dashboard', vehicles: vehicles });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send('Internal Server Error');
  }
};
