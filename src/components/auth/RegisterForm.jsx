import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const RegisterForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleRegister = () => {
    register()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-memoirs text-gray-800">
          Inscription
        </h2>
        
        <p className="text-gray-600 font-memoirs">
          Cliquez sur le bouton ci-dessous pour créer votre compte
        </p>

        <button
          onClick={handleRegister}
          className="w-full py-3 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 
                   transition-colors font-memoirs text-lg"
        >
          S'inscrire
        </button>
      </div>
    </div>
  )
}

export default RegisterForm
