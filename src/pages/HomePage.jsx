import React from 'react'
import PopularRecipes from '../components/common/PopularRecipes'
import RecipeList from '../components/recipes/RecipeList'

const HomePage = () => {
  return (
    <main className="flex-grow">
      {/* Hero Section */}

      {/* Liste des recettes */}
      <section
        className="relative container mx-auto backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-2xl mt-4 p-6"
        aria-label="Liste des recettes"
      >
        <RecipeList />
      </section>
    </main>
  )
}

export default HomePage
