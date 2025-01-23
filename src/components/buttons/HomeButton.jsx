import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const HomeButton = () => {
  return (
    <Link
      to="/"
      className="justify-center bg-white text-gray-800 px-6 py-2 rounded-full min-w-32 hover:bg-gray-100 transition-colors font-memoirs text-lg flex items-center gap-2 shadow-md shadow-gray-500"
    >
      <FaHome className="w-5 h-5" />
      <span>Accueil</span>
    </Link>
  )
}

export default HomeButton
