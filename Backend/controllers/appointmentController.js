const asyncHandler = require("express-async-handler");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

/**
 * @desc    Create new appointment
 * @route   POST /api/appointments
 * @access  Private (Patient)
 */
const createAppointment = asyncHandler(async (req, res) => {
  const { doctor, clinic, date, time, reason } = req.body;

  if (!doctor || !clinic || !date || !time || !reason) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Check if the doctor exists
  const doctorExists = await Doctor.findById(doctor);
  if (!doctorExists) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Check if the time slot is available
  // This is a simplified check - in a real app, you would check against the doctor's available slots
  const existingAppointment = await Appointment.findOne({
    doctor,
    date: new Date(date),
    time,
    status: { $ne: "cancelled" },
  });

  if (existingAppointment) {
    res.status(400);
    throw new Error("This time slot is already booked");
  }

  // Create appointment
  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor,
    clinic,
    date: new Date(date),
    time,
    reason,
    status: "scheduled",
  });

  if (appointment) {
    res.status(201).json(appointment);
  } else {
    res.status(400);
    throw new Error("Invalid appointment data");
  }
});

/**
 * @desc    Get user appointments
 * @route   GET /api/appointments
 * @access  Private (Patient)
 */
const getAppointments = asyncHandler(async (req, res) => {
  const { status } = req.query;

  // Build filter object
  const filter = { patient: req.user._id };

  // Add status filter if provided
  if (status) {
    filter.status = status;
  }

  const appointments = await Appointment.find(filter)
    .populate("doctor", "name specialization profilePhoto")
    .populate("clinic", "name address")
    .sort({ date: -1 });

  res.json(appointments);
});

/**
 * @desc    Get appointment by ID
 * @route   GET /api/appointments/:id
 * @access  Private
 */
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("patient", "name email phone")
    .populate("doctor", "name specialization profilePhoto email phone")
    .populate("clinic", "name address phone email");

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  // Check if the appointment belongs to the logged-in user or doctor
  const isPatientOwner =
    appointment.patient._id.toString() === req.user?._id.toString();
  const isDoctorOwner =
    req.doctor &&
    appointment.doctor._id.toString() === req.doctor?._id.toString();

  if (!isPatientOwner && !isDoctorOwner) {
    res.status(403);
    throw new Error("Not authorized to access this appointment");
  }

  res.json(appointment);
});

/**
 * @desc    Update appointment
 * @route   PUT /api/appointments/:id
 * @access  Private
 */
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  // Only allow patients to update their own appointments
  if (appointment.patient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this appointment");
  }

  // Only allow updates if appointment is scheduled (not completed or cancelled)
  if (appointment.status !== "scheduled") {
    res.status(400);
    throw new Error(`Cannot update a ${appointment.status} appointment`);
  }

  // Update fields
  appointment.date = new Date(req.body.date) || appointment.date;
  appointment.time = req.body.time || appointment.time;
  appointment.reason = req.body.reason || appointment.reason;

  // If changing date/time, check if new slot is available
  if (req.body.date || req.body.time) {
    const existingAppointment = await Appointment.findOne({
      doctor: appointment.doctor,
      date: new Date(req.body.date || appointment.date),
      time: req.body.time || appointment.time,
      _id: { $ne: appointment._id }, // Exclude current appointment
      status: { $ne: "cancelled" },
    });

    if (existingAppointment) {
      res.status(400);
      throw new Error("This time slot is already booked");
    }
  }

  const updatedAppointment = await appointment.save();

  res.json(updatedAppointment);
});

/**
 * @desc    Cancel appointment
 * @route   PUT /api/appointments/:id/cancel
 * @access  Private
 */
const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  // Check authorization - both patient and doctor can cancel
  const isPatientOwner =
    req.user && appointment.patient.toString() === req.user._id.toString();
  const isDoctorOwner =
    req.doctor && appointment.doctor.toString() === req.doctor._id.toString();

  if (!isPatientOwner && !isDoctorOwner) {
    res.status(403);
    throw new Error("Not authorized to cancel this appointment");
  }

  // Only allow cancellation if appointment is scheduled
  if (appointment.status !== "scheduled") {
    res.status(400);
    throw new Error(`Cannot cancel a ${appointment.status} appointment`);
  }

  appointment.status = "cancelled";
  appointment.cancelledBy = isPatientOwner ? "patient" : "doctor";
  appointment.cancelReason = req.body.reason || "No reason provided";

  const updatedAppointment = await appointment.save();

  res.json({
    message: "Appointment cancelled successfully",
    appointment: updatedAppointment,
  });
});

/**
 * @desc    Get doctor appointments
 * @route   GET /api/appointments/doctor
 * @access  Private (Doctor)
 */
const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { status, date } = req.query;

  // Build filter object
  const filter = { doctor: req.doctor._id };

  // Add status filter if provided
  if (status) {
    filter.status = status;
  }

  // Add date filter if provided
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1); // Next day

    filter.date = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  const appointments = await Appointment.find(filter)
    .populate("patient", "name email phone")
    .populate("clinic", "name address")
    .sort({ date: 1, time: 1 });

  res.json(appointments);
});

/**
 * @desc    Mark appointment as completed
 * @route   PUT /api/appointments/:id/complete
 * @access  Private (Doctor only)
 */
const completeAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  // Only doctors can mark appointments as completed
  if (appointment.doctor.toString() !== req.doctor._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to complete this appointment");
  }

  // Only allow completion if appointment is scheduled
  if (appointment.status !== "scheduled") {
    res.status(400);
    throw new Error(`Cannot complete a ${appointment.status} appointment`);
  }

  appointment.status = "completed";
  appointment.notes = req.body.notes || "";

  const updatedAppointment = await appointment.save();

  res.json({
    message: "Appointment marked as completed",
    appointment: updatedAppointment,
  });
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getDoctorAppointments,
  completeAppointment,
};
