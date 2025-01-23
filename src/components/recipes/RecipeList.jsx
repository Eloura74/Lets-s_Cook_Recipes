import React, { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import recipesData from '../../data/recettes.json'

const RecipeList = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(recipesData)
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-8">
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            className="min-w-[600px] flex-grow"
          />
        ))}
      </div>
    </div>
  )
}

export default RecipeList
