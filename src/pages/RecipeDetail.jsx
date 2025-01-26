import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipes } from '../contexts/RecipesContext'
import DifficultyStars from '../components/ui/DifficultyStars'

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
      <article
        className="max-w-4xl mx-auto bg-[#2C3639]/95 backdrop-blur-sm rounded-lg 
        shadow-[0_0_15px_5px_rgba(74,64,58,0.3),0_0_30px_10px_rgba(74,64,58,0.2)] 
        hover:shadow-[0_0_20px_8px_rgba(74,64,58,0.4),0_0_40px_15px_rgba(74,64,58,0.3)] 
        transition-shadow duration-300 
        overflow-hidden border border-[#DCD7C9]/5"
      >
        {recipe.imageUrl && (
          <figure className="relative w-full h-96">
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3639] via-transparent to-transparent z-10 " />
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h1 className="text-4xl font-memoirs text-[#DCD7C9] mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
                {recipe.title}
              </h1>
              <section className="flex flex-wrap items-center gap-4">
                {/* Difficulté */}
                <div className="flex items-center gap-2 text-[#DCD7C9] bg-[#2C3639]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#DCD7C9]/10">
                  <span className="font-medium">Difficulté:</span>
                  <DifficultyStars difficulty={recipe.difficulty} />
                </div>

                {/* Catégorie */}
                <div className="flex items-center gap-2 text-[#DCD7C9] bg-[#2C3639]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#DCD7C9]/10">
                  <span className="font-medium">Catégorie:</span>
                  <span>{recipe.category}</span>
                </div>

                {/* Temps de préparation */}
                {recipe.prepTime && (
                  <div className="flex items-center gap-2 text-[#DCD7C9] bg-[#2C3639]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#DCD7C9]/10">
                    <span className="font-medium">Temps:</span>
                    <span>{recipe.prepTime} min</span>
                  </div>
                )}
              </section>
            </div>
          </figure>
        )}

        <div className="p-6 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-memoirs text-[#DCD7C9] mb-4 pb-2 border-b border-[#DCD7C9]/10">
              Description
            </h2>
            <p className="text-[#DCD7C9]/90 leading-relaxed">
              {recipe.description}
            </p>
          </section>

          {/* Ingrédients */}
          <section>
            <h2 className="text-2xl font-memoirs text-[#DCD7C9] mb-4 pb-2 border-b border-[#DCD7C9]/10">
              Ingrédients
            </h2>
            {filteredIngredients.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-[#DCD7C9]/80 bg-[#3F4E4F]/30 p-3 rounded-lg"
                  >
                    <span className="w-2 h-2 bg-[#A27B5C] rounded-full"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#DCD7C9]/60 italic">
                Aucun ingrédient disponible
              </p>
            )}
          </section>

          {/* Instructions */}
          <section>
            <h2 className="text-2xl font-memoirs text-[#DCD7C9] mb-4 pb-2 border-b border-[#DCD7C9]/10">
              Instructions
            </h2>
            {filteredInstructions.length > 0 ? (
              <ol className="space-y-4">
                {filteredInstructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-[#DCD7C9]/80 bg-[#3F4E4F]/30 p-4 rounded-lg"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#A27B5C] rounded-full font-memoirs text-[#DCD7C9]">
                      {index + 1}
                    </span>
                    <p className="leading-relaxed">{instruction}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[#DCD7C9]/60 italic">
                Aucune instruction disponible
              </p>
            )}
          </section>
        </div>
      </article>
    </main>
  )
}

export default RecipeDetail
