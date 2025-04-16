import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
        subject: '',
        message: ''
      })
      setIsSubmitted(false)
    }, 5000)
  }
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to us using any of the methods below.
          </p>
        </div>
      </section>
      
      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <motion.div 
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary px-8 py-3"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaPhone className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-gray-600">Main: (555) 123-4567</p>
                      <p className="text-gray-600">Service: (555) 123-4568</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaEnvelope className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">info@egarage.com</p>
                      <p className="text-gray-600">service@egarage.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaMapMarkerAlt className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Location</h3>
                      <p className="text-gray-600">123 Garage Street</p>
                      <p className="text-gray-600">Auto City, AC 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaClock className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary text-white rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4">Emergency Service</h3>
                <p className="mb-4">
                  Need emergency assistance with your vehicle? Call our 24/7 emergency line:
                </p>
                <div className="text-2xl font-bold">(555) 999-8888</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're conveniently located in the heart of Auto City. Stop by for a visit!
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* In a real application, you would embed a Google Map or other map service here */}
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-lg">Map Placeholder - In a real application, a Google Map would be embedded here</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and policies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Do I need an appointment?</h3>
              <p className="text-gray-600">
                While we do accept walk-ins, we recommend scheduling an appointment to ensure prompt service. You can book online or call us.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">How long does a typical service take?</h3>
              <p className="text-gray-600">
                Service times vary depending on the type of service. Oil changes typically take 30-60 minutes, while more complex repairs may take longer.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Do you offer warranties?</h3>
              <p className="text-gray-600">
                Yes, we offer a 12-month/12,000-mile warranty on parts and labor for most services. Ask your service advisor for details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Do you provide loaner vehicles?</h3>
              <p className="text-gray-600">
                We offer a courtesy shuttle service within a 5-mile radius. Loaner vehicles are available for certain services with advance notice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact 