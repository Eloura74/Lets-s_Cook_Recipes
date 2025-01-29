import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usersData from '../data/users.json'

// Création du contexte
const AuthContext = createContext()

// Hook personnalisé pour utiliser le contexte
export const connection = () => useContext(AuthContext)

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
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const username = localStorage.getItem('username')

    if (isLoggedIn && username) {
      const foundUser = usersData.users.find(u => u.username === username)
      if (foundUser) {
        setUser(foundUser)
      }
    }
    setIsInitialized(true)
  }, [])

  // Ne pas rendre les enfants tant que l'initialisation n'est pas terminée
  if (!isInitialized) {
    return null // ou un composant de chargement si vous préférez
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import usersData from '../data/users.json'

// export const useAuthentication = () => {
//   const [user, setUser] = useState(null)

//   const navigate = useNavigate()
//   // fonction de connexion
//   const login = (username, password) => {
//     // Recherche de l'utilisateur dans le JSON
//     const foundUser = usersData.users.find(
//       u => u.username === username && u.password === password
//     )
//     if (foundUser) {
//       // Si l'utilisateur est trouvé, on le connecte
//       setUser(foundUser)
//       // Stocker l'état de connexion dans le localStorage
//       localStorage.setItem('logged', 'true')
//       localStorage.setItem('username', username)
//       // Redirection vers le dashboard
//       navigate('/dashboard')
//       return true
//     } else {
//       console.log("Mauvais nom d'utilisateur ou mot de passe")
//       return false
//     }
//   }

//   const logout = () => {
//     // Nettoyer le localStorage
//     localStorage.removeItem('logged')
//     localStorage.removeItem('username')
//     // Réinitialiser l'état de l'utilisateur
//     setUser(null)
//     // Redirection vers la page de accueil
//     navigate('/')
//   }

//   // Vérifier si l'utilisateur est connecté au chargement
//   useEffect(() => {
//     const logged = localStorage.getItem('logged')
//     const username = localStorage.getItem('username')
//     if (logged && username) {
//       const userFound = usersData.users.find(u => u.username === username)
//       if (userFound) {
//         setUser(userFound)
//       }
//     }
//   }, [])

//   return {
//     user,
//     setUser,
//     login,
//     logout,
//   }
// }
