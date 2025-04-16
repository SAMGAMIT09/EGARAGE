import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Vehicles from './pages/Customer/Vehicles'
import ServiceProviders from './pages/ServiceProviders/ServiceProviders'
import ServiceProviderDetails from './pages/ServiceProviders/ServiceProviderDetails'
import Appointments from './pages/Appointments/Appointments'
import BookAppointment from './pages/Appointments/BookAppointment'
import Payments from './pages/Payments/Payments'
import NotFound from './pages/NotFound'
import Booking from './pages/Booking'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         
          <Route path="/service-providers" element={<ServiceProviders />} />
          <Route path="/service-providers/:id" element={<ServiceProviderDetails />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />




          <Route
            path="/vehicles"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <Vehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute allowedRoles={['admin', 'customer', 'service_provider']}>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/book"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute allowedRoles={['admin', 'customer', 'service_provider']}>
                <Payments />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App 