const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/VehicleController');  

// Define routes
router.post('/add', vehicleController.addVehicle); 
router.get('/user/:userId', vehicleController.getUserVehicles);  
router.get('/:id', vehicleController.getVehicleById);  
module.exports = router;
