import React, { useState } from 'react'
import { connection } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { FaUser, FaLock } from 'react-icons/fa'
import { useA } from '../../App'

const FormLogin = () => {
  const a = useA()

  console.log(a)
  // ________________________________
  // State pour les champs de formulaire
  const [username, setUsername] = useState('')
  // State pour le mot de passe
  const [password, setPassword] = useState('')
  // Fonction pour se connecter
  const { login } = connection()

  // Fonction pour traiter le formulaire
  const Soumettre = e => {
    // Empêcher le rechargement de la page
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
              placeholder="Password"
              type="password"
              className="w-full p-2 bg-black mt-2"
              value={password}
              // quand on change le mot de passe, on met à jour "password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex  ">
          <button type="submit" className="w-full p-2 bg-red-500">
            Se connecter
          </button>
          <p className="text-center">
            Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default FormLogin
