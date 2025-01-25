import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const HomeButton = () => {
  const location = useLocation()
  const isActive = location.pathname === '/'

  return (
    <Link
      to="/"
      className={`btn-site flex items-center gap-2 ${
        isActive ? 'btn-site-active' : ''
      }`}
    >
      <FaHome className="w-5 h-5" />
      <span>Accueil</span>
    </Link>
  )
}

export default HomeButton
