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
    <div className="space-y-8">
      {/* Composant de filtres */}
      <Filters onFilterChange={appliquerFiltre} />

      {/* Grille de recettes avec animation */}
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {recettesAffichees.map(recette => (
          <RecipeCard key={recette.id} recipe={recette} />
        ))}
      </div>
    </div>
  )
}

export default RecipeList
