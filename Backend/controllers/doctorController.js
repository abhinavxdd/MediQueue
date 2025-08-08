const asyncHandler = require("express-async-handler");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const generateToken = require("../utils/generateToken");

/**
 * @desc    Register new doctor
 * @route   POST /api/doctors
 * @access  Public
 */
const registerDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    specialization,
    experience,
    qualifications,
    bio,
    clinicId,
  } = req.body;

  // Check if doctor already exists
  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(400);
    throw new Error("Doctor already exists");
  }

  // Create new doctor
  const doctor = await Doctor.create({
    name,
    email,
    password,
    phone,
    specialization,
    experience: experience || 0,
    qualifications: qualifications || [],
    bio: bio || "",
    clinicId,
  });

  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid doctor data");
  }
});

/**
 * @desc    Auth doctor & get token
 * @route   POST /api/doctors/login
 * @access  Public
 */
const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for doctor email
  const doctor = await Doctor.findOne({ email });
  // if (!doctor) throw new Error("Invalid email");
  // Verify password
  if (doctor && (await doctor.matchPassword(password))) {
    console.log("Doctor authenticated, generating token with ID:", doctor._id);

    const token = generateToken(doctor._id);
    console.log("Token generated successfully");
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      profilePhoto: doctor.profilePhoto,
      clinicId: doctor.clinicId,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc    Get doctor profile
 * @route   GET /api/doctors/profile
 * @access  Private
 */
const getDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.doctor._id).select("-password");

  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

/**
 * @desc    Update doctor profile
 * @route   PUT /api/doctors/profile
 * @access  Private
 */
const updateDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.doctor._id);

  if (doctor) {
    doctor.name = req.body.name || doctor.name;
    doctor.email = req.body.email || doctor.email;
    doctor.phone = req.body.phone || doctor.phone;
    doctor.specialization = req.body.specialization || doctor.specialization;
    doctor.experience = req.body.experience || doctor.experience;
    doctor.qualifications = req.body.qualifications || doctor.qualifications;
    doctor.bio = req.body.bio || doctor.bio;
    doctor.profilePhoto = req.body.profilePhoto || doctor.profilePhoto;
    doctor.consultationFee = req.body.consultationFee || doctor.consultationFee;

    if (req.body.password) {
      doctor.password = req.body.password;
    }

    const updatedDoctor = await doctor.save();

    res.json({
      _id: updatedDoctor._id,
      name: updatedDoctor.name,
      email: updatedDoctor.email,
      phone: updatedDoctor.phone,
      specialization: updatedDoctor.specialization,
      experience: updatedDoctor.experience,
      qualifications: updatedDoctor.qualifications,
      bio: updatedDoctor.bio,
      profilePhoto: updatedDoctor.profilePhoto,
      consultationFee: updatedDoctor.consultationFee,
      token: generateToken(updatedDoctor._id),
    });
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

/**
 * @desc    Get all doctors
 * @route   GET /api/doctors
 * @access  Public
 */
const getAllDoctors = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { specialization: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const clinic = req.query.clinic ? { clinicId: req.query.clinic } : {};

  const doctors = await Doctor.find({ ...keyword, ...clinic, isActive: true })
    .select("-password")
    .populate("clinicId", "name address location");

  res.json(doctors);
});

/**
 * @desc    Get doctor by ID
 * @route   GET /api/doctors/:id
 * @access  Public
 */
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id)
    .select("-password")
    .populate("clinicId", "name address location image");

  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

/**
 * @desc    Update doctor availability
 * @route   PUT /api/doctors/:id/availability
 * @access  Private (Doctor only)
 */
const updateAvailability = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.doctor._id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Ensure doctor can only update their own availability
  if (doctor._id.toString() !== req.doctor._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this doctor's availability");
  }

  doctor.availableSlots = req.body.availableSlots || doctor.availableSlots;

  const updatedDoctor = await doctor.save();

  res.json({
    message: "Availability updated successfully",
    availableSlots: updatedDoctor.availableSlots,
  });
});

/**
 * @desc    Get doctor's appointments
 * @route   GET /api/doctors/appointments
 * @access  Private (Doctor only)
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
 * @desc    Add doctor rating from patient
 * @route   POST /api/doctors/:id/ratings
 * @access  Private (Patient only)
 */
const addDoctorRating = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Check if user already submitted a review
  const alreadyReviewed = doctor.ratings.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Doctor already reviewed");
  }

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  doctor.ratings.push(review);

  // Update average rating
  await doctor.updateAverageRating();

  await doctor.save();

  res.status(201).json({ message: "Rating added" });
});

/**
 * @desc    Toggle doctor active status
 * @route   PUT /api/doctors/:id/toggle-status
 * @access  Private (Admin only)
 */
const toggleDoctorStatus = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  doctor.isActive = !doctor.isActive;

  const updatedDoctor = await doctor.save();

  res.json({
    message: `Doctor status ${
      updatedDoctor.isActive ? "activated" : "deactivated"
    } successfully`,
    isActive: updatedDoctor.isActive,
  });
});
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

  // Update doctor's available slots - remove the booked slot
  const appointmentDate = new Date(date).toISOString().split("T")[0];

  // Find and update the doctor's available slots for this date
  await Doctor.findByIdAndUpdate(doctor, {
    $pull: {
      [`availableSlots.${appointmentDate}`]: time,
    },
  });

  if (appointment) {
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("doctor", "name specialization")
      .populate("clinic", "name address");

    res.status(201).json(populatedAppointment);
  } else {
    res.status(400);
    throw new Error("Invalid appointment data");
  }
});

/**
 * @desc    Get doctor available slots for a specific date
 * @route   GET /api/doctors/:id/slots/:date
 * @access  Public
 */
const getDoctorAvailableSlots = asyncHandler(async (req, res) => {
  const { id: doctorId, date } = req.params;

  // Find the doctor
  const doctor = await Doctor.findById(doctorId);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Get existing appointments for this doctor on the specified date
  const existingAppointments = await Appointment.find({
    doctor: doctorId,
    date: new Date(date),
    status: { $ne: "cancelled" },
  }).select("time");

  // Extract booked times
  const bookedTimes = existingAppointments.map(appointment => appointment.time);

  // Default time slots (you can customize this based on doctor's schedule)
  const defaultSlots = [
    { id: 1, time: "09:00 AM", available: true },
    { id: 2, time: "09:30 AM", available: true },
    { id: 3, time: "10:00 AM", available: true },
    { id: 4, time: "10:30 AM", available: true },
    { id: 5, time: "11:00 AM", available: true },
    { id: 6, time: "11:30 AM", available: true },
    { id: 7, time: "12:00 PM", available: true },
    { id: 8, time: "12:30 PM", available: true },
    { id: 9, time: "02:00 PM", available: true },
    { id: 10, time: "02:30 PM", available: true },
    { id: 11, time: "03:00 PM", available: true },
    { id: 12, time: "03:30 PM", available: true },
    { id: 13, time: "04:00 PM", available: true },
    { id: 14, time: "04:30 PM", available: true },
  ];

  // Mark slots as unavailable if they're already booked
  const availableSlots = defaultSlots.map(slot => ({
    ...slot,
    available: !bookedTimes.includes(slot.time),
  }));

  res.json(availableSlots);
});

module.exports = {
  registerDoctor,
  loginDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getAllDoctors,
  getDoctorById,
  updateAvailability,
  getDoctorAppointments,
  addDoctorRating,
  toggleDoctorStatus,
  createAppointment,
  getDoctorAvailableSlots, // Add this line
};
