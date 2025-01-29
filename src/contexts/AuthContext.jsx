import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usersData from '../data/users.json'

// Création du contexte
const AuthContext = createContext()

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}

// Provider du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const navigate = useNavigate()

  // Fonction de connexion
  const login = (username, password) => {
    // Recherche de l'utilisateur dans le JSON
    const foundUser = usersData.users.find(
      u => u.username === username && u.password === password
    )

    if (foundUser) {
      // Si l'utilisateur est trouvé, on le connecte
      setUser(foundUser)
      // Stocker l'état de connexion dans le localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)
      // Redirection vers le dashboard
      navigate('/dashboard')
      return true
    } else {
      // Si l'utilisateur n'est pas trouvé
      alert("Nom d'utilisateur ou mot de passe incorrect")
      return false
    }
  }

  // Fonction d'inscription
  const register = (username, password) => {
    // Vérifier si l'utilisateur existe déjà
    const userExists = usersData.users.some(u => u.username === username)
    
    if (userExists) {
      alert("Ce nom d'utilisateur existe déjà")
      return false
    }

    // Ajouter le nouvel utilisateur
    const newUser = {
      username,
      password,
      role: 'user'
    }
    
    usersData.users.push(newUser)
    setUser(newUser)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', username)
    navigate('/dashboard')
    return true
  }

  // Fonction de déconnexion
  const logout = () => {
    // Nettoyer le localStorage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    // Réinitialiser l'état de l'utilisateur
    setUser(null)
    // Redirection vers la page d'accueil
    navigate('/')
  }

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const savedUsername = localStorage.getItem('username')

    if (isLoggedIn && savedUsername) {
      const savedUser = usersData.users.find(u => u.username === savedUsername)
      if (savedUser) {
        setUser(savedUser)
      }
    }
    setIsInitialized(true)
  }, [])

  // Ne pas rendre les enfants tant que l'initialisation n'est pas terminée
  if (!isInitialized) {
    return null // ou un composant de chargement si vous préférez
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isInitialized }}>
      {children}
    </AuthContext.Provider>
  )
}
