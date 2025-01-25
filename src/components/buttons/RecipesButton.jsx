import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUtensils } from 'react-icons/fa'

const RecipesButton = () => {
  const location = useLocation()
  const isActive = location.pathname === '/recettes'

  return (
    <Link
      to="/recettes"
      className={`btn-site flex items-center gap-2 ${
        isActive ? 'btn-site-active' : ''
      }`}
    >
      <FaUtensils className="w-5 h-5" />
      <span>Recettes</span>
    </Link>
  )
}

export default RecipesButton
