import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import { AuthProvider } from './contexts/AuthContext'
import { RecipesProvider } from './contexts/RecipesContext'
import HomePage from './pages/HomePage'
import RecipeDetail from './pages/RecipeDetail'

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipesProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#2C3639] to-[#3F4E4F]">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<RegisterForm />} />
                {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
                <Route path="/recette/:id" element={<RecipeDetail />} />
              </Routes>
            </main>
          </div>
        </RecipesProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
