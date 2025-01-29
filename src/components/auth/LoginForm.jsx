import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { FaUser, FaLock } from 'react-icons/fa'

const FormLogin = () => {
  // State pour les champs de formulaire
  const [username, setUsername] = useState('')
  // State pour le mot de passe
  const [password, setPassword] = useState('')
  // Utilisation du hook d'authentification
  const { login } = useAuth()

  // Fonction pour traiter le formulaire
  const Soumettre = e => {
    // Empêcher le rechargement de la page
    e.preventDefault()
    // Appeler la fonction login
    login(username, password)
  }

  return (
    // main pour avoir le pop up de connection par dessus la page home au clique sur connection
    <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] flex justify-center items-center bg-[#2C3639]/95 p-4 z-9999 ">
      <form onSubmit={Soumettre} className="flex flex-col space-y-4">
        <div className="flex items-center border-b border-[#2C3639]">
          <label username="username" className="w-full p-2 bg-red-500">
            <div className="flex items-center">
              <FaUser />
              <p className="ml-2">Entrez votre username</p>
            </div>
            <input
              placeholder="Username"
              type="username"
              className="w-full p-2 bg-black mt-2"
              value={username}
              // quand on change l'email, on met à jour "email"
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex items-center border-b border-[#2C3639]">
          <label password="password" className="w-full p-2 bg-red-500">
            <div className="flex items-center">
              <FaLock />
              <p className="ml-2">Entrez votre mot de passe</p>
            </div>
            <input
              placeholder="Mot de passe"
              type="password"
              className="w-full p-2 bg-black mt-2"
              value={password}
              // quand on change le mot de passe, on met à jour "password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-[#3F4E4F] text-white hover:bg-[#2C3639] transition-colors"
        >
          Se connecter
        </button>
        <p className="text-center">
          Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </form>
    </main>
  )
}

export default FormLogin
