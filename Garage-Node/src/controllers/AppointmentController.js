const AppointmentModel = require('../model/AppointmentModel');


// Book Appointment
exports.bookAppointment = async (req, res) => {
    try {
        const savedUser = await AppointmentModel.create(req.body);
          res.json({
            message: "User added Successfully",
            data: savedUser,
          });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Appointments by User ID
exports.getUserAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find(); 
        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found for this user." });
        }
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
