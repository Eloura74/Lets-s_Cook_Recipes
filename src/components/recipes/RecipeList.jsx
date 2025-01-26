import React, { useState } from 'react'
import RecipeCard from './RecipeCard'
import recipesData from '../../data/recettes.json'
import Filters from '../filters/Filters'

const RecipeList = () => {
  // État pour stocker les recettes filtrées
  const [recettesAffichees, setRecettesAffichees] = useState(recipesData)

  // Fonction pour appliquer un filtre
  const appliquerFiltre = fonctionFiltre => {
    const recettesFiltrees = fonctionFiltre(recipesData)
    setRecettesAffichees(recettesFiltrees)
  }

  return (
    <article className="space-y-6 md:space-y-8">
      {/* Section des filtres */}
      <section 
        aria-label="Filtres de recettes"
        className="sticky top-0 z-30 bg-[#2C3639]/95 backdrop-blur-sm p-4 rounded-xl shadow-lg"
      >
        <Filters onFilterChange={appliquerFiltre} />
      </section>

      {/* Grille de recettes */}
      <section aria-label="Liste des recettes" className="mt-4">
        {recettesAffichees.length === 0 ? (
          <p className="text-center text-lg text-[#DCD7C9]/80 py-8">
            Aucune recette ne correspond à vos critères.
          </p>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr" 
            role="list"
          >
            {recettesAffichees.map(recette => (
              <div key={recette.id} role="listitem" className="transform transition-transform hover:-translate-y-1">
                <RecipeCard recipe={recette} />
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  )
}

export default RecipeList
