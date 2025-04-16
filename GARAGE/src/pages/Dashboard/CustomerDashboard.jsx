import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCarAlt, FaCalendarAlt, FaTools, FaMoneyBillWave, FaPlus } from 'react-icons/fa';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalVehicles: 0,
    upcomingAppointments: 0,
    completedServices: 0,
    totalSpent: 0
  });
  
  const [vehicles, setVehicles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        totalVehicles: 2,
        upcomingAppointments: 1,
        completedServices: 5,
        totalSpent: 850
      });
      
      setVehicles([
        { id: 1, make: 'Toyota', model: 'Camry', year: 2018, licensePlate: 'ABC123', lastService: '2023-09-15' },
        { id: 2, make: 'Honda', model: 'Civic', year: 2020, licensePlate: 'XYZ789', lastService: '2023-10-05' }
      ]);
      
      setAppointments([
        { id: 1, service: 'Oil Change', provider: 'Quick Fix Garage', date: '2023-10-25', time: '10:00 AM', status: 'confirmed' },
        { id: 2, service: 'Brake Inspection', provider: 'Smith Auto', date: '2023-09-20', time: '2:30 PM', status: 'completed' },
        { id: 3, service: 'Tire Rotation', provider: 'Quick Fix Garage', date: '2023-08-15', time: '11:00 AM', status: 'completed' }
      ]);
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaCarAlt className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Your Vehicles</p>
                <h3 className="text-2xl font-bold">{stats.totalVehicles}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-secondary/10 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-secondary text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Upcoming Appointments</p>
                <h3 className="text-2xl font-bold">{stats.upcomingAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaTools className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed Services</p>
                <h3 className="text-2xl font-bold">{stats.completedServices}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FaMoneyBillWave className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Spent</p>
                <h3 className="text-2xl font-bold">${stats.totalSpent}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link 
            to="/vehicles" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <FaPlus className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Add a Vehicle</h3>
              <p className="text-gray-500 text-sm">Register a new vehicle</p>
            </div>
          </Link>
          
          <Link 
            to="/service-providers" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-secondary/10 p-3 rounded-full mr-4">
              <FaTools className="text-secondary text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Find Service Provider</h3>
              <p className="text-gray-500 text-sm">Browse service providers</p>
            </div>
          </Link>
          
          <Link 
            to="/appointments/book" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaCalendarAlt className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Book Appointment</h3>
              <p className="text-gray-500 text-sm">Schedule a new service</p>
            </div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Vehicles */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Vehicles</h2>
              <Link to="/vehicles" className="text-primary hover:underline text-sm">Manage Vehicles</Link>
            </div>
            <div className="p-6">
              {vehicles.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Plate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {vehicles.map(vehicle => (
                        <tr key={vehicle.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-gray-500">{vehicle.year}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{vehicle.licensePlate}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{vehicle.lastService}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't added any vehicles yet.</p>
                  <Link 
                    to="/vehicles/add" 
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    <FaPlus className="mr-2" />
                    Add Vehicle
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Appointments</h2>
              <Link to="/appointments" className="text-primary hover:underline text-sm">View All</Link>
            </div>
            <div className="p-6">
              {appointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.service}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{appointment.provider}</td>
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
                  <p className="text-gray-500 mb-4">You don't have any appointments yet.</p>
                  <Link 
                    to="/appointments/book" 
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Book Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard; 