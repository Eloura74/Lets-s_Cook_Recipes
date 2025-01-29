import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Header from './components/common/Header'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import { AuthProvider } from './contexts/AuthContext'
import { RecipesProvider } from './contexts/RecipesContext'
import HomePage from './pages/HomePage'
import RecipeDetail from './pages/RecipeDetail'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './contexts/AuthContext'

// Composant de protection des routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function App() {
  // const [a, setA] = useState('aaa')

  return (
    <Router>
      {/* <TestContext.Provider value={a}> */}
      <AuthProvider>
        <RecipesProvider>
          {/* div pour le logging */}
          <div className="min-h-screen flex flex-col background-principale">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<RegisterForm />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/recette/:id" element={<RecipeDetail />} />
              </Routes>
            </main>
          </div>
        </RecipesProvider>
      </AuthProvider>
      {/* </TestContext.Provider> */}
    </Router>
  )
}

export default App
