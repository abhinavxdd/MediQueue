# MediQueue
MediQueue is a web application designed to simplify dentist appointment management by enabling patients to book appointments and view available time slots, while allowing dentists to manage their schedules and patient details. Built with the **MERN** stack, it features secure authentication, a clean and responsive interface, and an intuitive workflow, developed collaboratively by a team of three.

## ✨ Features
- 📅 **Appointment Booking** – Patients can schedule appointments easily through a simple form.  
- 👩‍⚕️ **Dentist Schedule Management** – Dentists can view and manage upcoming appointments.  
- 🔐 **Secure Authentication** – Login system for patients and dentists to protect data.  
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop devices.  
- 🗂 **Organized Dashboard** – Clear interface for tracking and managing appointments efficiently.  

## 🛠 Tech Stack
### Frontend
- **React.js** – For building a responsive and dynamic user interface  
- **Vite** – Fast development environment and build tool for the frontend  
- **Tailwind CSS** – Utility-first CSS framework for styling  

### Backend
- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web framework for handling API routes and server logic  
- **MongoDB Atlas** – Cloud-hosted NoSQL database for storing application data  
- **JWT Authentication** – For secure login and protected routes  

### Tools & Utilities
- **dotenv** – For managing environment variables securely  
- **cors** – For enabling cross-origin communication between frontend and backend  

## Installation and Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/MediQueue.git
cd MediQueue
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `backend\` folder:
```bash
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,https://your-deployed-frontend-link
```
Start the backend server:
```bash
node server.js
```
or (if you use nodemon)
```bash
nodemon server.js
```
### 3. Frontend Setup
```bash
cd Frontend/react-mediqueue
npm install
```
Start the frontend development server:
```bash
npm run dev
```
### 4. Usage
- Open your browser and go to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).
- Log in or register as a patient or dentist.
- Patients can book appointments by selecting an available date and time.
- Dentists can view and manage scheduled appointments through their dashboard.

### 5. Key Considerations
- Make sure your backend (`localhost:5001` by default) is running before using the frontend.
- **Never commit your `.env` file or API keys to public repositories.**
## Contributing
Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please open an issue or submit a pull request.  
Before contributing, please make sure your code follows the project’s coding standards and is well-documented.
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
## Contact
For questions, feedback, or collaboration opportunities, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/abh1navvv/) or open an issue on this GitHub repository.
