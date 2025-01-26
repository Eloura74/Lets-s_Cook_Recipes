import React, { createContext, useContext, useState, useEffect } from 'react'
import recipesData from '../data/recettes.json'

// Création du contexte
const RecipesContext = createContext()

// Fonction pour fournir les recettes
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
    // Vérifie si la recette existe
    setRecipes(prevRecipes =>
      // Retourne une nouvelle liste de recettes avec les likes mis à jour
      prevRecipes.map(
        recipe =>
          // Si la recette existe, mise à jour du nombre de likes
          recipe.id === recipeId
            ? { ...recipe, likes: (recipe.likes || 0) + 1 } // Mise à jour du nombre de likes
            : recipe // Sinon Retourne l'objet recette sans modification
      )
    )
  }

  // Fonction pour incrémenter les vues d'une recette
  const incrementViews = recipeId => {
    // Vérifie si la recette existe
    setRecipes(prevRecipes =>
      // Retourne une nouvelle liste de recettes avec les vues mis à jour
      prevRecipes.map(
        recipe =>
          // Si la recette existe, mise à jour du nombre de vues
          recipe.id === recipeId
            ? { ...recipe, views: (recipe.views || 0) + 1 } // Mise à jour du nombre de vues
            : recipe // Sinon Retourne l'objet recette sans modification
      )
    )
  }

  // Charger les recettes au démarrage avec useEffect
  useEffect(() => {
    console.log('Chargement initial des recettes')
    // Appel de la fonction de chargement des recettes
    fetchRecipes()
  }, [])

  // Log l'état des recettes après chaque mise à jour
  useEffect(() => {
    console.log('État actuel des recettes:', recipes)
  }, [recipes])

  // Valeur du contexte
  const value = {
    recipes, // Liste des recettes
    loading, // Indique si les recettes sont chargées
    error, // Indique si une erreur s'est produite lors du chargement
    likeRecipe, // Fonction pour ajouter un like à une recette
    incrementViews, // Fonction pour incrémenter les vues d'une recette
    fetchRecipes, // Fonction pour charger les recettes
  }

  return (
    // Provider :  permet de partager des données globales avec l'ensemble des composants enfants,
    // sans avoir besoin de passer ces données manuellement à chaque niveau de la hiérarchie de composants
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useRecipes = () => {
  const context = useContext(RecipesContext) // Utilisation du contexte
  if (!context) {
    // Vérifie si le contexte existe
    throw new Error( // Lance une erreur si le contexte n'existe pas
      "useRecipes doit être utilisé à l'intérieur d'un RecipesProvider"
    )
  }
  return context
}
