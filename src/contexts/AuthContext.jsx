import React, { createContext, useState, useContext } from 'react'

// Création d'un contexte pour partager les informations d'authentification
const AuthContext = createContext(null)

// Fournisseur d'authentification qui englobe les composants enfants
export const AuthProvider = ({ children }) => {
  // État pour stocker les informations de l'utilisateur (null par défaut)
  const [user, setUser] = useState(null)

  // Fonction pour simuler la connexion d'un utilisateur
  const login = () => {
    setUser({
      name: 'Quentin', // Nom de l'utilisateur connecté
      role: 'user', // Rôle de l'utilisateur
    })
    return true // Retourne vrai pour indiquer que la connexion a réussi
  }

  // Fonction pour simuler l'inscription d'un nouvel utilisateur
  const register = () => {
    setUser({
      name: 'Nouvel Utilisateur', // Nom par défaut du nouvel utilisateur
      role: 'user', // Rôle par défaut
    })
    return true // Retourne vrai pour indiquer que l'inscription a réussi
  }

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null) // Réinitialise l'état utilisateur à null
  }

  // Le contexte partage l'utilisateur et les fonctions d'authentification
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children} {/* Rend les composants enfants accessibles ici */}
    </AuthContext.Provider>
  )
}

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext) // Récupère le contexte
  if (!context) {
    // Vérifie que le composant est bien dans un AuthProvider
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context // Retourne les données et fonctions d'authentification
}
