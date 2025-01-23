import React from 'react'
import RecipeList from '../components/recipes/RecipeList'

const Home = () => {
  return (
    <main className="min-h-screen s">
      <div className="text-center py-8">
        <h1 className="text-4xl font-memoirs mb-4">Bienvenue sur Let's Cook</h1>
        <p className="text-gray-600">
          Découvrez nos meilleures recettes de cuisine
        </p>
      </div>
      <RecipeList />
    </main>
  )
}

export default Home
