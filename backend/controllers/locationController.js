const Location = require("../models/Location");

exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.getAll();
        res.json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.getById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json(location);
    } catch (error) {
        console.error("Error fetching location:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.createLocation = async (req, res) => {
    try {
        const newLocation = await Location.create(req.body);
        res.status(201).json(newLocation);
    } catch (error) {
        console.error("Error creating location:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
