const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getDoctorAppointments,
} = require("../controllers/appointmentController");
const { protect, doctorProtect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, createAppointment)
  .get(protect, getAppointments);
router.get("/doctor", doctorProtect, getDoctorAppointments);
router
  .route("/:id")
  .get(protect, getAppointmentById)
  .put(protect, updateAppointment);
router.put("/:id/cancel", protect, cancelAppointment);

module.exports = router;
