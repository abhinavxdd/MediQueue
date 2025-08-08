const express = require("express");
const router = express.Router();
const {
  registerDoctor,
  loginDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getAllDoctors,
  getDoctorById,
  updateAvailability,
  getDoctorAvailableSlots, // Add this import
} = require("../controllers/doctorController");
const { protect, doctorProtect } = require("../middleware/authMiddleware");

router.post("/", registerDoctor);
router.post("/login", loginDoctor);
router.get("/", getAllDoctors);
router
  .route("/profile")
  .get(doctorProtect, getDoctorProfile)
  .put(doctorProtect, updateDoctorProfile);
router.get("/:id", getDoctorById);
router.get("/:id/slots/:date", getDoctorAvailableSlots); // Add this route
router.put("/:id/availability", doctorProtect, updateAvailability);

module.exports = router;
