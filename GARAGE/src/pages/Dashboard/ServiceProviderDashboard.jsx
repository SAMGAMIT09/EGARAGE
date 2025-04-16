import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTools, FaCalendarAlt, FaUserCheck, FaMoneyBillWave, FaPlus } from 'react-icons/fa';

const ServiceProviderDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalServices: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0
  });
  
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        totalServices: 8,
        pendingAppointments: 3,
        completedAppointments: 12,
        totalRevenue: 2450
      });
      
      setServices([
        { id: 1, name: 'Oil Change', price: 49.99, duration: '30 min', description: 'Full synthetic oil change service' },
        { id: 2, name: 'Brake Inspection', price: 29.99, duration: '45 min', description: 'Complete brake system inspection' },
        { id: 3, name: 'Tire Rotation', price: 19.99, duration: '30 min', description: 'Tire rotation and pressure check' },
        { id: 4, name: 'Engine Diagnostics', price: 89.99, duration: '60 min', description: 'Computer diagnostics for engine issues' }
      ]);
      
      setAppointments([
        { id: 1, customer: 'John Doe', service: 'Oil Change', vehicle: 'Toyota Camry 2018', date: '2023-10-25', time: '10:00 AM', status: 'confirmed' },
        { id: 2, customer: 'Sarah Wilson', service: 'Brake Inspection', vehicle: 'Honda Civic 2020', date: '2023-10-26', time: '2:30 PM', status: 'pending' },
        { id: 3, customer: 'Michael Brown', service: 'Engine Diagnostics', vehicle: 'Ford F-150 2019', date: '2023-10-24', time: '11:00 AM', status: 'confirmed' },
        { id: 4, customer: 'Lisa Johnson', service: 'Tire Rotation', vehicle: 'Chevrolet Malibu 2017', date: '2023-10-20', time: '9:15 AM', status: 'completed' }
      ]);
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Service Provider Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.businessName || currentUser.name}</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaTools className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Services</p>
                <h3 className="text-2xl font-bold">{stats.totalServices}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending Appointments</p>
                <h3 className="text-2xl font-bold">{stats.pendingAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaUserCheck className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed Jobs</p>
                <h3 className="text-2xl font-bold">{stats.completedAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-secondary/10 p-3 rounded-full mr-4">
                <FaMoneyBillWave className="text-secondary text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link 
            to="/services/add" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <FaPlus className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Add Service</h3>
              <p className="text-gray-500 text-sm">Create a new service offering</p>
            </div>
          </Link>
          
          <Link 
            to="/appointments" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <FaCalendarAlt className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Appointments</h3>
              <p className="text-gray-500 text-sm">View and update appointments</p>
            </div>
          </Link>
          
          <Link 
            to="/profile" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-secondary/10 p-3 rounded-full mr-4">
              <FaTools className="text-secondary text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Business Profile</h3>
              <p className="text-gray-500 text-sm">Update your garage details</p>
            </div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Services */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Services</h2>
              <Link to="/services" className="text-primary hover:underline text-sm">Manage Services</Link>
            </div>
            <div className="p-6">
              {services.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {services.map(service => (
                        <tr key={service.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${service.price}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't added any services yet.</p>
                  <Link 
                    to="/services/add" 
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    <FaPlus className="mr-2" />
                    Add Service
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
              <Link to="/appointments" className="text-primary hover:underline text-sm">View All</Link>
            </div>
            <div className="p-6">
              {appointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{appointment.customer}</div>
                            <div className="text-sm text-gray-500">{appointment.vehicle}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{appointment.service}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {appointment.date} at {appointment.time}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">You don't have any upcoming appointments.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard; 