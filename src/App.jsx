import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<RegisterForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
