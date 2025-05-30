const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Doctor = require("./models/Doctor");
const Clinic = require("./models/Clinic");
const Appointment = require("./models/Appointment");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const sampleUsers = [
  {
    name: "John Patient",
    email: "patient@example.com",
    password: "123456",
    phone: "9876543210",
    role: "patient",
  },
  // Add more sample users as needed
];

const sampleDoctors = [
  {
    name: "Dr. Sarah Johnson",
    email: "doctor@example.com",
    password: "123456",
    phone: "1234567890",
    specialization: "Orthodontics",
    experience: 7,
    qualifications: ["BDS", "MDS - Orthodontics"],
    bio: "Specialist in orthodontic treatments with 7 years of experience.",
    registrationNumber: "DEN12345",
    consultationFee: 1500,
  },
  // Add more sample doctors
];

const sampleClinics = [
  {
    name: "Brightsmile Dental Clinic",
    address: "123 Medical Avenue",
    location: "Hamirpur",
    description:
      "Brightsmile Dental Clinic is a state-of-the-art dental facility offering comprehensive dental care with the latest technology.",
    phone: "+91 98765 43210",
    email: "info@brightsmile.com",
    website: "www.brightsmile.com",
    hours: "Monday to Saturday: 9:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
    rating: 4.8,
    numReviews: 127,
  },
  // Add more clinics
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Doctor.deleteMany();
    await Clinic.deleteMany();
    await Appointment.deleteMany();

    // Hash passwords before inserting
    const hashedUserData = await Promise.all(
      sampleUsers.map(async user => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    const hashedDoctorData = await Promise.all(
      sampleDoctors.map(async doctor => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(doctor.password, salt);
        return { ...doctor, password: hashedPassword };
      })
    );

    // Create users with hashed passwords
    const createdUsers = await User.insertMany(hashedUserData);

    // Create doctors with hashed passwords
    const createdDoctors = await Doctor.insertMany(hashedDoctorData);

    // Create clinics
    const createdClinics = await Clinic.insertMany(sampleClinics);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
