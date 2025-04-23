// Backend/controllers/clinicController.js
const asyncHandler = require("express-async-handler");
const Clinic = require("../models/Clinic");

// @desc    Get all clinics
// @route   GET /api/clinics
// @access  Public
const getClinics = asyncHandler(async (req, res) => {
  const clinics = await Clinic.find({});
  res.json(clinics);
});

// @desc    Get clinic by ID
// @route   GET /api/clinics/:id
// @access  Public
const getClinicById = asyncHandler(async (req, res) => {
  const clinic = await Clinic.findById(req.params.id);

  if (clinic) {
    res.json(clinic);
  } else {
    res.status(404);
    throw new Error("Clinic not found");
  }
});

// @desc    Get clinics by location
// @route   GET /api/clinics/location/:location
// @access  Public
const getClinicsByLocation = asyncHandler(async (req, res) => {
  const clinics = await Clinic.find({ location: req.params.location });
  res.json(clinics);
});

module.exports = { getClinics, getClinicById, getClinicsByLocation };
