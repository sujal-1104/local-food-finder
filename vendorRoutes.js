const express = require('express');
const router = express.Router();
const Vendor = require("../models/Vendor");

// GET all vendors
router.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error.message); // Log error message
    res.status(500).json({ error: "Server error", details: error.message });
  }
});


// @route   GET /api/vendors/:id
// @desc    Get a single vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// @route   POST /api/vendors
// @desc    Add a new vendor
router.post("/vendors", async (req, res) => {
  try {

    console.log("Request received at /api/vendors"); // Debugging
    console.log("Request body:", req.body); // Debugging

    const { name, category, location, description, image } = req.body;

    const newVendor = new Vendor({
      name,
      category,
      location,
      description,
      image,
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor created successfully!" });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/vendors/:id
// @desc    Update a vendor by ID
router.put('/:id', async (req, res) => {
  const { name, category, location, description, image } = req.body;
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, category, location, description, image },
      { new: true }
    );
    if (!updatedVendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(updatedVendor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update vendor' });
  }
});

// @route   DELETE /api/vendors/:id
// @desc    Delete a vendor by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json({ message: 'Vendor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
});

// @route   GET /api/vendors/nearby
// @desc    Find nearby vendors based on latitude, longitude, and radius (in km)
router.get('/nearby', async (req, res) => {
  const { latitude, longitude, radius = 5 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  const radiusInMeters = radius * 1000; // Convert radius from km to meters

  try {
    const vendors = await Vendor.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: radiusInMeters
        }
      }
    });

    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching nearby vendors.' });
  }
});

module.exports = router;
