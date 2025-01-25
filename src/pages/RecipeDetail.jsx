import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecipes } from '../contexts/RecipesContext'

const RecipeDetail = () => {
  const { id } = useParams()
  const { recipes } = useRecipes()
  const recipe = recipes.find(r => r.id === parseInt(id))

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Recette non trouvée
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.titre}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipe.titre}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-gray-600">
              Difficulté: {recipe.difficulte}
            </span>
            <span className="text-gray-600">
              Temps de préparation: {recipe.tempsPreparation}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600">{recipe.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ingrédients
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient.quantite} {ingredient.unite} {ingredient.nom}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-600">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
