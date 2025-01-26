import React, { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useRecipes } from '../contexts/RecipesContext'
import DifficultyStars from '../components/ui/DifficultyStars'
import { FaHeart, FaEye, FaClock } from 'react-icons/fa'

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { recipes, incrementViews } = useRecipes()
  const recipe = recipes.find(r => r.id === id)
  const viewIncremented = useRef(false)

  useEffect(() => {
    if (recipe && !viewIncremented.current) {
      incrementViews(recipe.id)
      viewIncremented.current = true
    }
  }, [recipe, incrementViews])

  if (!recipe) {
    return (
      <div className="text-center text-[#DCD7C9] p-8">
        <h1 className="text-2xl font-bold mb-4">Recette non trouvée</h1>
        <Link
          to="/"
          className="bg-[#A27B5C] text-white px-4 py-2 rounded-lg hover:bg-[#A27B5C]/80 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-[#2C3639] rounded-xl shadow-xl overflow-hidden">
        {/* En-tête avec image */}
        <div className="relative h-96">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <FaHeart className="text-red-500" />
                {recipe.likes}
              </span>
              <span className="flex items-center gap-1">
                <FaEye className="text-blue-400" />
                {recipe.views}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-green-400" />
                {recipe.prepTime} min
              </span>
              <DifficultyStars difficulty={recipe.difficulty} />
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-6 text-[#DCD7C9]">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-[#DCD7C9]/90">{recipe.description}</p>
          </div>

          {/* Ingrédients */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Ingrédients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-[#DCD7C9]/90">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal list-inside space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-[#DCD7C9]/90">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Bouton retour */}
        <div className="p-6 border-t border-[#A27B5C]/20">
          <Link
            to="/"
            className="bg-[#A27B5C] text-white px-4 py-2 rounded-lg hover:bg-[#A27B5C]/80 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
