import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  // Fonction de connexion
  const handleLogin = () => {
    login() // Effectue l'action de connexion
    navigate('/') // Redirige l'utilisateur vers la page d'accueil
  }

  // Connexion automatique lorsque le composant est monté
  useEffect(() => {
    handleLogin()
  }, []) // [] signifie que cela s'exécutera uniquement lors du premier rendu

  return (
    <div className="min-h-screen flex-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-memoirs text-gray-800">Connexion</h2>

        <p className="text-gray-600 font-memoirs">
          Vous êtes en cours de connexion...
        </p>
      </div>
    </div>
  )
}

export default LoginForm
