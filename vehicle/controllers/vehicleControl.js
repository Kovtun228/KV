const db = require('../config/db');


exports.getVehicles = async (req, res) => {
    try {

      const [vehicles] = await db.query('SELECT * FROM vehicles');
      res.render('vehicles', { title: 'Vehicles List', vehicles });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).send('Internal Server Error');
    }
  };
exports.addVehicle = (req, res) => {
    const { brand, model, year, licensePlate } = req.body;
    const query = 'INSERT INTO vehicles (brand, model, year, licensePlate) VALUES (?, ?, ?, ?)';
    db.execute(query, [brand, model, year, licensePlate], (err, results) => {
        if (err) throw err;
        res.redirect('/vehicles');
    });
};

exports.editVehicle = (req, res) => {
    const { brand, model, year, licensePlate } = req.body;
    const query = 'UPDATE vehicles SET brand = ?, model = ?, year = ?, licensePlate = ? WHERE id = ?';
    db.execute(query, [brand, model, year, licensePlate, req.params.id], (err, results) => {
        if (err) throw err;
        res.redirect('/vehicles');
    });
};

exports.deleteVehicle = (req, res) => {
    const query = 'DELETE FROM vehicles WHERE id = ?';
    db.execute(query, [req.params.id], (err, results) => {
        if (err) throw err;
        res.redirect('/vehicles');
    });
};
