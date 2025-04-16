import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaTools, FaCalendarAlt } from 'react-icons/fa';

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('services');
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchServiceProvider = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock service provider data
      const mockProvider = {
        id: parseInt(id),
        name: 'Quick Fix Garage',
        rating: 4.8,
        reviewCount: 124,
        address: '123 Main St, Los Angeles, CA 90001',
        phone: '(555) 123-4567',
        email: 'info@quickfixgarage.com',
        website: 'www.quickfixgarage.com',
        hours: [
          { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
          { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
          { day: 'Sunday', hours: 'Closed' }
        ],
        description: 'Quick Fix Garage is a full-service auto repair shop with certified mechanics. We specialize in providing fast, reliable service for all makes and models. Our team is committed to delivering quality workmanship and exceptional customer service.',
        services: [
          { id: 1, name: 'Oil Change', price: 49.99, duration: '30 min', description: 'Full synthetic oil change service including oil filter replacement and fluid check.' },
          { id: 2, name: 'Brake Inspection', price: 29.99, duration: '45 min', description: 'Complete brake system inspection including pads, rotors, and brake fluid.' },
          { id: 3, name: 'Tire Rotation', price: 19.99, duration: '30 min', description: 'Tire rotation and pressure check to ensure even wear and extend tire life.' },
          { id: 4, name: 'Engine Diagnostics', price: 89.99, duration: '60 min', description: 'Computer diagnostics to identify engine issues and performance problems.' },
          { id: 5, name: 'AC Service', price: 79.99, duration: '60 min', description: 'Air conditioning system check, refrigerant recharge, and leak detection.' },
          { id: 6, name: 'Battery Replacement', price: 149.99, duration: '30 min', description: 'Battery testing and replacement with a new high-quality battery.' }
        ],
        reviews: [
          { id: 1, user: 'John D.', rating: 5, date: '2023-10-10', comment: 'Great service! They fixed my car quickly and at a reasonable price.' },
          { id: 2, user: 'Sarah M.', rating: 4, date: '2023-09-25', comment: 'Professional staff and good work. Slightly more expensive than I expected.' },
          { id: 3, user: 'Robert L.', rating: 5, date: '2023-09-15', comment: 'Excellent service. They explained everything they were doing and why.' },
          { id: 4, user: 'Emily K.', rating: 5, date: '2023-08-30', comment: 'I\'ve been coming here for years. Always reliable and honest.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1597762117709-859f744b84c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1632823471565-1ecdf5cc2f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
        ]
      };
      
      setProvider(mockProvider);
      setLoading(false);
    };
    
    fetchServiceProvider();
  }, [id]);
  
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Loading service provider details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!provider) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Provider Not Found</h2>
            <p className="text-gray-600 mb-6">The service provider you're looking for doesn't exist or has been removed.</p>
            <Link to="/service-providers" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Back to Service Providers
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="h-64 bg-gray-200 relative">
            <img 
              src={provider.gallery[0]} 
              alt={provider.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span>{provider.rating} ({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{provider.address}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <FaPhone className="text-primary mr-2" />
                <span>{provider.phone}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-primary mr-2" />
                <span>{provider.email}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-primary mr-2" />
                <span>{provider.hours[0].hours} (Mon-Fri)</span>
              </div>
            </div>
            
            <p className="text-gray-700">{provider.description}</p>
            
            <div className="mt-6 flex justify-end">
              <Link 
                to={`/appointments/book?provider=${provider.id}`}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                <FaCalendarAlt className="mr-2" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b">
            <nav className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'services' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'gallery' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('gallery')}
              >
                Gallery
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'hours' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('hours')}
              >
                Business Hours
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Available Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {provider.services.map(service => (
                    <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <div className="text-lg font-bold text-primary">${service.price}</div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FaClock className="mr-1" />
                        <span>{service.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                      <div className="mt-4">
                        <Link 
                          to={`/appointments/book?provider=${provider.id}&service=${service.id}`}
                          className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 text-sm"
                        >
                          <FaCalendarAlt className="mr-1" size={12} />
                          Book This Service
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <span className="font-medium">{provider.rating} out of 5</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {provider.reviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{review.user}</h3>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                                size={14}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provider.gallery.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden h-48">
                      <img 
                        src={image} 
                        alt={`${provider.name} gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Hours Tab */}
            {activeTab === 'hours' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Business Hours</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <table className="w-full">
                    <tbody>
                      {provider.hours.map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-3 font-medium">{item.day}</td>
                          <td className="py-3 text-right">{item.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Back Button */}
        <div className="flex justify-start mb-8">
          <Link 
            to="/service-providers" 
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            &larr; Back to Service Providers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetails; 