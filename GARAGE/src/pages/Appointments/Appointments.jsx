import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCalendarAlt, FaFilter, FaSearch, FaEye, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';

const Appointments = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchAppointments = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let mockAppointments = [];
      
      // Different mock data based on user role
      if (currentUser.role === 'customer') {
        mockAppointments = [
          {
            id: 1,
            service: 'Oil Change',
            provider: 'Quick Fix Garage',
            providerId: 1,
            vehicle: 'Toyota Camry 2018',
            vehicleId: 1,
            date: '2023-10-25',
            time: '10:00 AM',
            status: 'confirmed',
            price: 49.99,
            notes: 'Please use synthetic oil.',
            createdAt: '2023-10-15'
          },
          {
            id: 2,
            service: 'Brake Inspection',
            provider: 'Smith Auto Repair',
            providerId: 2,
            vehicle: 'Honda Civic 2020',
            vehicleId: 2,
            date: '2023-10-30',
            time: '2:30 PM',
            status: 'pending',
            price: 29.99,
            notes: '',
            createdAt: '2023-10-18'
          },
          {
            id: 3,
            service: 'Engine Diagnostics',
            provider: 'Elite Auto Care',
            providerId: 3,
            vehicle: 'Toyota Camry 2018',
            vehicleId: 1,
            date: '2023-09-15',
            time: '11:00 AM',
            status: 'completed',
            price: 89.99,
            notes: 'Check engine light is on.',
            createdAt: '2023-09-10'
          },
          {
            id: 4,
            service: 'Tire Rotation',
            provider: 'Quick Fix Garage',
            providerId: 1,
            vehicle: 'Honda Civic 2020',
            vehicleId: 2,
            date: '2023-09-05',
            time: '9:15 AM',
            status: 'cancelled',
            price: 19.99,
            notes: '',
            createdAt: '2023-08-30'
          }
        ];
      } else if (currentUser.role === 'service_provider') {
        mockAppointments = [
          {
            id: 1,
            service: 'Oil Change',
            customer: 'John Doe',
            customerId: 1,
            vehicle: 'Toyota Camry 2018',
            date: '2023-10-25',
            time: '10:00 AM',
            status: 'confirmed',
            price: 49.99,
            notes: 'Please use synthetic oil.',
            createdAt: '2023-10-15'
          },
          {
            id: 2,
            service: 'Brake Inspection',
            customer: 'Sarah Wilson',
            customerId: 2,
            vehicle: 'Honda Civic 2020',
            date: '2023-10-26',
            time: '2:30 PM',
            status: 'pending',
            price: 29.99,
            notes: '',
            createdAt: '2023-10-18'
          },
          {
            id: 3,
            service: 'Engine Diagnostics',
            customer: 'Michael Brown',
            customerId: 3,
            vehicle: 'Ford F-150 2019',
            date: '2023-10-24',
            time: '11:00 AM',
            status: 'confirmed',
            price: 89.99,
            notes: 'Check engine light is on.',
            createdAt: '2023-10-14'
          },
          {
            id: 4,
            service: 'Tire Rotation',
            customer: 'Lisa Johnson',
            customerId: 4,
            vehicle: 'Chevrolet Malibu 2017',
            date: '2023-10-20',
            time: '9:15 AM',
            status: 'completed',
            price: 19.99,
            notes: '',
            createdAt: '2023-10-10'
          },
          {
            id: 5,
            service: 'AC Repair',
            customer: 'Robert Davis',
            customerId: 5,
            vehicle: 'Nissan Altima 2016',
            date: '2023-10-18',
            time: '1:00 PM',
            status: 'cancelled',
            price: 79.99,
            notes: 'AC not cooling properly.',
            createdAt: '2023-10-08'
          }
        ];
      } else if (currentUser.role === 'admin') {
        mockAppointments = [
          {
            id: 1,
            service: 'Oil Change',
            customer: 'John Doe',
            customerId: 1,
            provider: 'Quick Fix Garage',
            providerId: 1,
            vehicle: 'Toyota Camry 2018',
            date: '2023-10-25',
            time: '10:00 AM',
            status: 'confirmed',
            price: 49.99,
            notes: 'Please use synthetic oil.',
            createdAt: '2023-10-15'
          },
          {
            id: 2,
            service: 'Brake Inspection',
            customer: 'Sarah Wilson',
            customerId: 2,
            provider: 'Smith Auto Repair',
            providerId: 2,
            vehicle: 'Honda Civic 2020',
            date: '2023-10-30',
            time: '2:30 PM',
            status: 'pending',
            price: 29.99,
            notes: '',
            createdAt: '2023-10-18'
          },
          {
            id: 3,
            service: 'Engine Diagnostics',
            customer: 'Michael Brown',
            customerId: 3,
            provider: 'Elite Auto Care',
            providerId: 3,
            vehicle: 'Ford F-150 2019',
            date: '2023-10-24',
            time: '11:00 AM',
            status: 'confirmed',
            price: 89.99,
            notes: 'Check engine light is on.',
            createdAt: '2023-10-14'
          },
          {
            id: 4,
            service: 'Tire Rotation',
            customer: 'Lisa Johnson',
            customerId: 4,
            provider: 'Quick Fix Garage',
            providerId: 1,
            vehicle: 'Chevrolet Malibu 2017',
            date: '2023-10-20',
            time: '9:15 AM',
            status: 'completed',
            price: 19.99,
            notes: '',
            createdAt: '2023-10-10'
          },
          {
            id: 5,
            service: 'AC Repair',
            customer: 'Robert Davis',
            customerId: 5,
            provider: 'Smith Auto Repair',
            providerId: 2,
            vehicle: 'Nissan Altima 2016',
            date: '2023-10-18',
            time: '1:00 PM',
            status: 'cancelled',
            price: 79.99,
            notes: 'AC not cooling properly.',
            createdAt: '2023-10-08'
          }
        ];
      }
      
      setAppointments(mockAppointments);
      setLoading(false);
    };
    
    fetchAppointments();
  }, [currentUser]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
  
  const handleViewDetails = (appointment) => {
    setCurrentAppointment(appointment);
    setShowDetailsModal(true);
  };
  
  const handleCancelAppointment = (appointment) => {
    setCurrentAppointment(appointment);
    setShowCancelModal(true);
  };
  
  const confirmCancelAppointment = () => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll just update the state
    
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === currentAppointment.id) {
        return { ...appointment, status: 'cancelled' };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
    setShowCancelModal(false);
  };
  
  const updateAppointmentStatus = (appointmentId, newStatus) => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll just update the state
    
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
  };
  
  // Filter appointments based on search term and status filter
  const filteredAppointments = appointments.filter(appointment => {
    // Search term filter
    const searchFields = [
      appointment.service,
      appointment.vehicle,
      appointment.customer,
      appointment.provider,
      appointment.date,
      appointment.time
    ].filter(Boolean);
    
    const matchesSearch = searchTerm === '' || 
      searchFields.some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-600">
              {currentUser.role === 'customer' 
                ? 'Manage your service appointments' 
                : currentUser.role === 'service_provider'
                  ? 'Manage customer appointments'
                  : 'All service appointments'}
            </p>
          </div>
          
          {currentUser.role === 'customer' && (
            <Link
              to="/appointments/book"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              <FaCalendarAlt className="mr-2" />
              Book Appointment
            </Link>
          )}
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            {/* Search Bar */}
            <div className="flex-grow mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    {currentUser.role !== 'customer' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    )}
                    {currentUser.role !== 'service_provider' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{appointment.service}</div>
                        <div className="text-sm text-gray-500">${appointment.price}</div>
                      </td>
                      
                      {currentUser.role !== 'customer' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.customer}</div>
                        </td>
                      )}
                      
                      {currentUser.role !== 'service_provider' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.provider}</div>
                        </td>
                      )}
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.vehicle}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-blue-100 text-blue-800' 
                            : appointment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : appointment.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(appointment)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          
                          {appointment.status === 'pending' && currentUser.role === 'service_provider' && (
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                              title="Confirm Appointment"
                            >
                              <FaCheck />
                            </button>
                          )}
                          
                          {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                            <button
                              onClick={() => handleCancelAppointment(appointment)}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel Appointment"
                            >
                              <FaTimes />
                            </button>
                          )}
                          
                          {appointment.status === 'confirmed' && currentUser.role === 'service_provider' && (
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                              className="text-green-600 hover:text-green-900"
                              title="Mark as Completed"
                            >
                              <FaCheck />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FaCalendarAlt className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
              {searchTerm || statusFilter !== 'all' ? (
                <p className="text-gray-500">No appointments match your search criteria. Try adjusting your filters.</p>
              ) : (
                <p className="text-gray-500 mb-4">You don't have any appointments yet.</p>
              )}
              {!searchTerm && statusFilter === 'all' && currentUser.role === 'customer' && (
                <Link
                  to="/appointments/book"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Your First Appointment
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Appointment Details Modal */}
      {showDetailsModal && currentAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Appointment Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{currentAppointment.service}</h4>
                    <p className="text-gray-600">${currentAppointment.price}</p>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    currentAppointment.status === 'confirmed' 
                      ? 'bg-blue-100 text-blue-800' 
                      : currentAppointment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : currentAppointment.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                  }`}>
                    {currentAppointment.status.charAt(0).toUpperCase() + currentAppointment.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{currentAppointment.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{currentAppointment.time}</p>
                  </div>
                </div>
                
                {currentUser.role !== 'customer' && (
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{currentAppointment.customer}</p>
                  </div>
                )}
                
                {currentUser.role !== 'service_provider' && (
                  <div>
                    <p className="text-sm text-gray-500">Service Provider</p>
                    <p className="font-medium">{currentAppointment.provider}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-medium">{currentAppointment.vehicle}</p>
                </div>
                
                {currentAppointment.notes && (
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="font-medium">{currentAppointment.notes}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500">Booked On</p>
                  <p className="font-medium">{currentAppointment.createdAt}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                
                {(currentAppointment.status === 'pending' || currentAppointment.status === 'confirmed') && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleCancelAppointment(currentAppointment);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cancel Confirmation Modal */}
      {showCancelModal && currentAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Confirm Cancellation</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel your appointment for {currentAppointment.service} on {currentAppointment.date} at {currentAppointment.time}? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  No, Keep Appointment
                </button>
                <button
                  onClick={confirmCancelAppointment}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Yes, Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments; 