const { Vehicle } = require('../models');

// Create vehicle
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create vehicle', details: err.message });
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles', details: err.message });
  }
};

// Get vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicle', details: err.message });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    await vehicle.update(req.body);
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update vehicle', details: err.message });
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vehicle', details: err.message });
  }
};

// Add service (dummy for now)
exports.addService = async (req, res) => {
  res.json({ message: 'Service added (not implemented yet)' });
};

// Add refuel (dummy for now)
exports.addRefuel = async (req, res) => {
  res.json({ message: 'Refuel added (not implemented yet)' });
};

// Get vehicles by driver
exports.getVehiclesByDriverId = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { driverId: req.params.driverId } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles by driver', details: err.message });
  }
};
