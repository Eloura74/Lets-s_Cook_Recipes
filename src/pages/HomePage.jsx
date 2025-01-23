import React from 'react'
import RecipeList from '../components/recipes/RecipeList'

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fond principal avec dégradé complexe */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C3639] via-[#3F4E4F] to-[#A27B5C]" />

      {/* Effet de lumière radiale */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#DCD7C9]/20 to-transparent" />

      {/* Effet de vignette pour plus de profondeur */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)]" />

      {/* Contenu principal avec effet de verre */}
      <div className="relative">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center py-12">
            {/* Titre avec effet de lumière */}
            <div className="relative">
              <h1 className="text-6xl font-memoirs text-[#DCD7C9] mb-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5),_0_0_20px_rgba(220,215,201,0.3)]">
                Bienvenue sur Let's Cook
              </h1>
              {/* Ligne décorative */}
              <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#DCD7C9]/50 to-transparent mx-auto my-4" />
            </div>

            {/* Sous-titre avec effet de flou */}
            <p className="text-xl text-[#DCD7C9]/90 mb-8 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">
              Découvrez nos meilleures recettes de cuisine
            </p>
          </div>

          {/* Zone des recettes avec effet de verre */}
          <div className="backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-2xl p-6">
            <RecipeList />
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
