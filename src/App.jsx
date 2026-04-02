import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Pages
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Cameras from './pages/Cameras/Cameras'
import CameraDetail from './pages/Cameras/CameraDetail'
import Alerts from './pages/Alerts/Alerts'
import Settings from './pages/Settings/Settings'
import Profile from './pages/Profile/Profile'
import Devices from './pages/Devices/Devices'
import OtpVerify from './pages/OtpVerify/OtpVerify'
import { InstallAppNotice } from './components/organisms'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Public Route Component (redirect if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <Navigate to="/" replace /> : children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login/otp"
          element={
            <PublicRoute>
              <OtpVerify />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cameras"
          element={
            <ProtectedRoute>
              <Cameras />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cameras/:id"
          element={
            <ProtectedRoute>
              <CameraDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/devices"
          element={
            <ProtectedRoute>
              <Devices />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <InstallAppNotice />
    </BrowserRouter>
  )
}

export default App
