const db = require('../config/db');

const Vehicle = {
  getAll: (callback) => {
    db.execute('SELECT * FROM vehicles', callback);
  },
  create: (vehicleData, callback) => {
    const { brand, model, year, licensePlate } = vehicleData;
    db.execute('INSERT INTO vehicles (brand, model, year, licensePlate) VALUES (?, ?, ?, ?)', [brand, model, year, licensePlate], callback);
  }
};

module.exports = Vehicle;
