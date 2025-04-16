const Vehicle = require('../model/VehicleModel');

// Add Vehicle
const addVehicle = async (req, res) => {
    try {
      const vehicleobj = {
        userId : req.body.userId,
        make:req.body.make,
        model:req.body.model,
        year:req.body.year,
        fueltype:req.body.fueltype,
        registrationNumber:req.body.registrationNumber,
        vehicleColor:req.body.vehicleColor
      }

       const vehicle =  await Vehicle.create(vehicleobj)
        res.status(201).json({
            data:vehicle,
            message: "Vehicle added successfully"});
     
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Vehicles by User ID
const getUserVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Vehicle by ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addVehicle,
    getUserVehicles,
    getVehicleById
}