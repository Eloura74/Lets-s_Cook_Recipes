import React from 'react'
import { Link } from 'react-router-dom'
import { FaUtensils } from 'react-icons/fa'

const RecipesButton = () => {
  return (
    <Link
      to="/recipes"
      className="justify-center bg-white text-gray-800 px-6 py-2 rounded-full min-w-32 hover:bg-gray-100 transition-colors font-memoirs text-lg flex items-center gap-2 shadow-md shadow-gray-500"
    >
      <FaUtensils className="w-5 h-5" />
      <span>Recettes</span>
    </Link>
  )
}

export default RecipesButton
