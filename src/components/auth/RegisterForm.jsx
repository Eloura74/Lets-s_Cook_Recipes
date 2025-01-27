import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const RegisterForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  // Fonction d'inscription
  const handleRegister = () => {
    register() // Effectue l'inscription
    navigate('/') // Redirige vers la page d'accueil après l'inscription
  }

  // Inscription automatique lorsque le composant est monté
  useEffect(() => {
    handleRegister()
  }, []) // [] pour exécuter l'effet uniquement lors du premier rendu

  return (
    <div className="min-h-screen flex-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-memoirs text-gray-800">Inscription</h2>

        <p className="text-gray-600 font-memoirs">
          Votre compte est en cours de création...
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
