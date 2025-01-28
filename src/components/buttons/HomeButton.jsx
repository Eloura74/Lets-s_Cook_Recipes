import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const HomeButton = () => {
  const location = useLocation()
  const isActive = location.pathname === '/' // Active l'Accueil si la page actuelle est l'accueil

  return (
    <Link
      to="/"
      className={`btn-site flex items-center gap-2 ${
        isActive ? 'btn-site-active' : ''
      }`} // Ajoute la classe active si la page actuelle est l'accueil
    >
      <FaHome className="max-w-5 max-h-5" />
      <span className="mx-auto pr-4 text-2xl">Accueil</span>
    </Link>
  )
}

export default HomeButton
