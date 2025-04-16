import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import ServiceProviderDashboard from './ServiceProviderDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Render different dashboard based on user role
  switch (currentUser.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'customer':
      return <CustomerDashboard />;
    case 'service_provider':
      return <ServiceProviderDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

export default Dashboard; 