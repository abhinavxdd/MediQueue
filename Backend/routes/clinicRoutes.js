const express = require("express");
const router = express.Router();
const {
  getClinics,
  getClinicById,
  getClinicsByLocation,
} = require("../controllers/clinicController");

router.get("/", getClinics);
router.get("/location/:location", getClinicsByLocation);
router.get("/:id", getClinicById);

module.exports = router;
