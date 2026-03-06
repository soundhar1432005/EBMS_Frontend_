import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import Resources from './pages/Resources'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProviderSignUp from './pages/ProviderSignUp'
import ProviderLogin from './pages/ProviderLogin'
import ProviderDashboard from './pages/provider/ProviderDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import BookingForm from './pages/BookingForm'
import FunctionHallBooking from './pages/FunctionHallBooking'
import Dashboard from './pages/Dashboard'
import ServiceProviders from './pages/ServiceProviders'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Navigation />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/client" element={<SignUp />} />
            <Route path="/signup/provider" element={<ProviderSignUp />} />
            <Route path="/login/provider" element={<ProviderLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            
            {/* Provider Routes */}
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Protected Client Routes */}
            <Route 
              path="/service-providers" 
              element={
                <ProtectedRoute>
                  <ServiceProviders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pricing" 
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features" 
              element={
                <ProtectedRoute>
                  <Features />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings/:category" 
              element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings/function-hall" 
              element={
                <ProtectedRoute>
                  <FunctionHallBooking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
