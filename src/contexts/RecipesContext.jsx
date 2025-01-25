import React, { createContext, useContext, useState, useEffect } from 'react'
import recipesData from '../data/recettes.json'

// Création du contexte
const RecipesContext = createContext()

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fonction pour charger les recettes
  const fetchRecipes = async () => {
    try {
      setLoading(true)
      console.log('Données des recettes:', recipesData)
      setRecipes(recipesData)
    } catch (err) {
      setError('Erreur lors du chargement des recettes')
      console.error('Erreur de chargement:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour ajouter un like à une recette
  const likeRecipe = recipeId => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, likes: (recipe.likes || 0) + 1 }
          : recipe
      )
    )
  }

  // Fonction pour incrémenter les vues d'une recette
  const incrementViews = recipeId => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, views: (recipe.views || 0) + 1 }
          : recipe
      )
    )
  }

  // Charger les recettes au démarrage
  useEffect(() => {
    console.log('Chargement initial des recettes')
    fetchRecipes()
  }, [])

  // Log l'état des recettes après chaque mise à jour
  useEffect(() => {
    console.log('État actuel des recettes:', recipes)
  }, [recipes])

  const value = {
    recipes,
    loading,
    error,
    likeRecipe,
    incrementViews,
    fetchRecipes
  }

  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useRecipes = () => {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error('useRecipes doit être utilisé à l\'intérieur d\'un RecipesProvider')
  }
  return context
}
