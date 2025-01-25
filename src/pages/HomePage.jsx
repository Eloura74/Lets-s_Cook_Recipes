import React from 'react'
import RecipeList from '../components/recipes/RecipeList'

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Fond principal avec dégradé */}
        <div className="absolute inset-0 bg-linear-to-r from-[#2C3639] via-[#3F4E4F] to-[#A27B5C]" />
        {/* Effet de lumière radiale */}
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-[#DCD7C9]/20 to-transparent" />
        {/* Effet de vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Contenu principal */}
      <section className="relative container mx-auto backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-2xl mt-4 p-6" aria-label="Liste des recettes">
        <RecipeList />
      </section>
    </main>
  )
}

export default HomePage
