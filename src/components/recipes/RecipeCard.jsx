import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  return (
    <section className="min-w-[300px] bg-gradient-to-b from-gray-100 to-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 radial-gradient">
      <div className="recipe-card-image-container">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-card-image"
        />
      </div>
      <article className="p-6">
        <h3 className="text-gray-800 text-xl font-memoirs font-semibold mb-3">
          {recipe.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* icone mùinuteur */}
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm text-gray-500">{recipe.prepTime} min</span>
          </div>
          <Link
            to={`/recipe/${recipe.id}`}
            className="bg-slate-200 px-4 py-2 rounded-full hover:opacity-90 transition-opacity font-memoirs text-sm shadow-md"
          >
            Voir la recette
          </Link>
        </div>
      </article>
    </section>
  )
}

export default RecipeCard
