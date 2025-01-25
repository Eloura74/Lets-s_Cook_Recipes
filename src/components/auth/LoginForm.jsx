import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-memoirs text-gray-800">Connexion</h2>

        <p className="text-gray-600 font-memoirs">
          Cliquez sur le bouton ci-dessous pour vous connecter
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-3 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 
                   transition-colors font-memoirs text-lg"
        >
          Se connecter
        </button>
      </div>
    </div>
  )
}

export default LoginForm
