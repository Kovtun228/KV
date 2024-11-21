const express = require("express");
const router = express.Router();
const db = require('../config/db')
const vehicleController = require("../controllers/vehicleControl");

router.get('/vehicles', vehicleController.getVehicles);
router.get('/addVehicle', (req, res) => {
  res.render('addVehicle');
});
router.post('/vehicles/edit/:id', vehicleController.editVehicle);
router.post('/vehicles/delete/:id', vehicleController.deleteVehicle);
router.post('/addVehicle/', async (req, res) => {
  const { brand, model, year, licensePlate } = req.body;

  try {
    await db.execute(
      "INSERT INTO vehicles (brand, model, year, licensePlate) VALUES (?, ?, ?, ?)",
      [brand, model, year, licensePlate]
    );
    res.redirect("/vehicles");
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
