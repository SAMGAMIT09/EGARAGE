import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaCarAlt, FaTools, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServiceProviders: 0,
    totalCustomers: 0,
    totalAppointments: 0,
    totalRevenue: 0
  });
  
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        totalUsers: 156,
        totalServiceProviders: 42,
        totalCustomers: 114,
        totalAppointments: 287,
        totalRevenue: 28750
      });
      
      setRecentUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', createdAt: '2023-10-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'service_provider', businessName: 'Smith Auto', createdAt: '2023-10-14' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'customer', createdAt: '2023-10-13' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'service_provider', businessName: 'Quick Fix Garage', createdAt: '2023-10-12' }
      ]);
      
      setRecentAppointments([
        { id: 1, customer: 'John Doe', service: 'Oil Change', provider: 'Quick Fix Garage', date: '2023-10-20', status: 'confirmed' },
        { id: 2, customer: 'Sarah Wilson', service: 'Brake Repair', provider: 'Smith Auto', date: '2023-10-19', status: 'pending' },
        { id: 3, customer: 'Michael Brown', service: 'Engine Diagnostics', provider: 'Quick Fix Garage', date: '2023-10-18', status: 'completed' },
        { id: 4, customer: 'Lisa Johnson', service: 'Tire Replacement', provider: 'Smith Auto', date: '2023-10-17', status: 'cancelled' }
      ]);
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaUsers className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-secondary/10 p-3 rounded-full mr-4">
                <FaTools className="text-secondary text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Service Providers</p>
                <h3 className="text-2xl font-bold">{stats.totalServiceProviders}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaCarAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Customers</p>
                <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Appointments</p>
                <h3 className="text-2xl font-bold">{stats.totalAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaMoneyBillWave className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
              <Link to="/users" className="text-primary hover:underline text-sm">View All</Link>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentUsers.map(user => (
                      <tr key={user.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          {user.businessName && (
                            <div className="text-sm text-gray-500">{user.businessName}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : user.role === 'service_provider'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'service_provider' ? 'Service Provider' : user.role === 'admin' ? 'Admin' : 'Customer'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
              </div>
          {/* Recent Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Appointments</h2>
              <Link to="/appointments" className="text-primary hover:underline text-sm">View All</Link>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.customer}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{appointment.service}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{appointment.provider}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 