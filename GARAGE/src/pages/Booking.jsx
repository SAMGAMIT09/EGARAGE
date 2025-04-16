import { useState } from 'react'
import { motion } from 'framer-motion'

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    vehicle: '',
    message: ''
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after submission (in a real app, you might do this after successful API response)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        vehicle: '',
        message: ''
      })
      setIsSubmitted(false)
    }, 5000)
  }
  
  const services = [
    "Oil Change",
    "Engine Repair",
    "Brake Service",
    "Battery Service",
    "AC Repair",
    "Diagnostics",
    "Transmission Service",
    "Tire Service",
    "Other"
  ]
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Schedule your service appointment online and we'll get back to you to confirm the details.
          </p>
        </div>
      </section>
      
      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Request Submitted!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for booking with us. We'll contact you shortly to confirm your appointment.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Book Another Appointment
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment Details</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Personal Information */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="vehicle">
                          Vehicle (Make, Model, Year) *
                        </label>
                        <input
                          type="text"
                          id="vehicle"
                          name="vehicle"
                          value={formData.vehicle}
                          onChange={handleChange}
                          placeholder="e.g. Toyota Camry 2019"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      {/* Appointment Details */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="time">
                          Preferred Time *
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select a time</option>
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="service">
                          Service Type *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Please provide any additional details about your service needs..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary px-8 py-3"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Business Hours</h3>
              <ul className="space-y-1 text-gray-600">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Phone: (555) 123-4567</li>
                <li>Email: service@egarage.com</li>
                <li>Address: 123 Garage Street, Auto City, AC 12345</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Booking Information</h3>
              <ul className="space-y-1 text-gray-600">
                <li>We'll confirm your appointment within 24 hours</li>
                <li>Please arrive 10 minutes before your appointment</li>
                <li>Cancellations should be made at least 24 hours in advance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Booking 