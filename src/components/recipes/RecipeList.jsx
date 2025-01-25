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
    <article className="space-y-8">
      {/* Section des filtres */}
      <section aria-label="Filtres de recettes">
        <Filters onFilterChange={appliquerFiltre} />
      </section>

      {/* Grille de recettes */}
      <section aria-label="Liste des recettes" className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr" role="list">
          {recettesAffichees.map(recette => (
            <div key={recette.id} role="listitem">
              <RecipeCard recipe={recette} />
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

export default RecipeList
