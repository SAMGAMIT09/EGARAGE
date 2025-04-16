const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({

fullName: {
    type: String,
    required: true
},
phoneNumber: {
     type: String,
     require: true
},

email: {
    type: String,
    unique: true,
    required: true
},
serviceType:{
    type: String,
    require:true
},
vehicle:{
     type: String,
     require: true
},

preferredDate :{
    type: Date,
    require:true

},
preferredTime : {

    type: String,
    require: true
},
additionalInformation:{

    type: String,
    require: true
},

}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
