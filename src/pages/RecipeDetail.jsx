import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipes } from '../contexts/RecipesContext'

const RecipeDetail = () => {
  const { id } = useParams()
  const { recipes } = useRecipes()

  // Log pour le débogage
  useEffect(() => {
    console.log('ID recherché:', id)
    console.log('Toutes les recettes:', recipes)
  }, [id, recipes])

  const recipe = recipes.find(r => r.id === id)

  // Log pour le débogage de la recette trouvée
  useEffect(() => {
    if (recipe) {
      console.log('Recette trouvée:', recipe)
      console.log('Ingrédients:', recipe.ingredients)
    }
  }, [recipe])

  if (!recipe) {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="text-center">
          <h1 className="text-2xl font-bold text-[#DCD7C9]">
            Recette non trouvée
          </h1>
          <p className="text-[#DCD7C9]/80 mt-2">ID: {id}</p>
        </section>
      </main>
    )
  }

  // Filtrer les ingrédients et instructions vides
  const filteredIngredients = recipe.ingredients.filter(
    ingredient => ingredient && ingredient.trim() !== ''
  )
  const filteredInstructions = recipe.instructions.filter(
    instruction => instruction && instruction.trim() !== ''
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto bg-[#2C3639]/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        {recipe.imageUrl && (
          <figure className="relative w-full h-96">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </figure>
        )}

        <div className="p-6">
          <header>
            <h1 className="text-3xl font-bold text-[#DCD7C9] mb-4">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-[#DCD7C9]/80 bg-[#A27B5C]/20 px-3 py-1 rounded-full">
                Difficulté: {recipe.difficulty}
              </span>
              <span className="text-[#DCD7C9]/80 bg-[#A27B5C]/20 px-3 py-1 rounded-full">
                Catégorie: {recipe.category}
              </span>
              {recipe.prepTime && (
                <span className="text-[#DCD7C9]/80 bg-[#A27B5C]/20 px-3 py-1 rounded-full">
                  Temps de préparation: {recipe.prepTime} min
                </span>
              )}
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#DCD7C9] mb-2">
              Description
            </h2>
            <p className="text-[#DCD7C9]/80">{recipe.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#DCD7C9] mb-4">
              Ingrédients
            </h2>
            {filteredIngredients.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="text-[#DCD7C9]/80 bg-[#A27B5C]/10 px-4 py-2 rounded-lg flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#A27B5C] rounded-full mr-3"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#DCD7C9]/60 italic">
                Aucun ingrédient listé pour cette recette.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#DCD7C9] mb-4">
              Instructions
            </h2>
            {filteredInstructions.length > 0 ? (
              <ol className="space-y-4">
                {filteredInstructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="text-[#DCD7C9]/80 bg-[#A27B5C]/10 px-4 py-3 rounded-lg flex"
                  >
                    <span className="text-[#A27B5C] font-bold mr-4">
                      {index + 1}.
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[#DCD7C9]/60 italic">
                Aucune instruction listée pour cette recette.
              </p>
            )}
          </section>
        </div>
      </article>
    </main>
  )
}

export default RecipeDetail
