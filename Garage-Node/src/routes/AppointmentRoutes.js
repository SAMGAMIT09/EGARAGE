const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

router.post('/book', appointmentController.bookAppointment);
router.get('/user', appointmentController.getUserAppointments);
// router.get('/:id', appointmentController.getAppointmentById);

module.exports = router;