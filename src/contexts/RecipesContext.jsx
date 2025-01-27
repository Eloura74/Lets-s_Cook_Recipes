import React, { createContext, useContext, useState, useEffect } from 'react'
import recipesData from '../data/recettes.json'

// Création du contexte
const RecipesContext = createContext()

// Fonction pour fournir les recettes
export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Charger les recettes au montage du composant
  useEffect(() => {
    fetchRecipes()
  }, [])

  // Fonction pour charger les recettes
  const fetchRecipes = async () => {
    try {
      setLoading(true)
      // Charger les recettes du localStorage
      const savedRecettes = localStorage.getItem('recettes') // utilisation de localStorage pour les sauvegardes
      // Si des recettes sont sauvegardées, les charger ; sinon, un tableau vide
      const localRecettes = savedRecettes ? JSON.parse(savedRecettes) : []

      // Convertir les recettes locales au format attendu
      const formattedLocalRecettes = localRecettes.map(recette => ({
        id: recette.id.toString(),
        title: recette.titre,
        description: recette.description,
        difficulty: recette.difficulte,
        prepTime: parseInt(recette.tempsPreparation) || 0,
        imageUrl: recette.imageUrl,
        ingredients: recette.ingredients,
        instructions: recette.instructions,
        likes: recette.likes || 0,
        views: recette.views || 0,
        category: recette.category || 'Plat principal',
        author: recette.author || 'Utilisateur',
        createdAt: recette.dateCreation || new Date().toISOString(), //toISOString() : Retourne la date et l'heure dans un format universel (ISO 8601)
      }))

      // Marquer les recettes par défaut
      const defaultRecipes = recipesData.map(recipe => ({
        ...recipe, // Copier toutes les propriétés de la recette
        isDefault: true,
      }))

      // Combiner les recettes locales et les recettes par défaut
      const allRecipes = [...formattedLocalRecettes, ...defaultRecipes]

      // Supprimer les doublons
      const uniqueRecipes = Array.from(
        new Map(allRecipes.map(recipe => [recipe.id, recipe])).values()
      )

      setRecipes(uniqueRecipes) // Mettre à jour le contexte avec les recettes uniques
    } catch (err) {
      // Gestion des erreurs
      setError(err.message)
      console.error('Erreur lors du chargement des recettes:', err)
    } finally {
      setLoading(false) // Fin du chargement
    }
  }

  // Fonction pour incrémenter les vues
  const incrementViews = recipeId => {
    setRecipes(prevRecipes => {
      // Mettre à jour les recettes
      const updatedRecipes = prevRecipes.map(recipe => {
        // Mettre à jour chaque recette
        if (recipe.id === recipeId) {
          // Si c'est la recette demandée
          const updatedRecipe = { ...recipe, views: (recipe.views || 0) + 1 } // Mettre à jour le nombre de vues
          if (!recipe.isDefault) {
            // Si c'est une recette locale
            const savedRecettes = JSON.parse(
              // Charger les recettes sauvegardées
              localStorage.getItem('recettes') || '[]' // ou '[]' si aucune sauvegarde
            )
            const updatedSavedRecettes = savedRecettes.map(
              (
                r // Mettre à jour les recettes sauvegardées
              ) =>
                r.id === recipeId ? { ...r, views: updatedRecipe.views } : r // Si la recette a l'id correspondant, mettre à jour le nombre de vues ; sinon, ne rien faire
            )
            localStorage.setItem(
              'recettes',
              JSON.stringify(updatedSavedRecettes)
            )
          }
          return updatedRecipe
        }
        return recipe
      })
      return updatedRecipes
    })
  }

  // Fonction pour ajouter un like à une recette
  // const likeRecipe = recipeId => {
  //   setRecipes(prevRecipes =>
  //     prevRecipes.map(recipe =>
  //       recipe.id === recipeId
  //         ? { ...recipe, likes: (recipe.likes || 0) + 1 }
  //         : recipe
  //     )
  //   )
  // }

  // Fonction pour ajouter une nouvelle recette
  const addRecipe = newRecipe => {
    const convertRecipes = {
      ...newRecipe,
      likes: 0,
      views: 0,
      category: newRecipe.category || 'Plat principal',
      author: newRecipe.author || 'Utilisateur',
      createdAt: new Date().toISOString(),
      isDefault: false,
    }

    // Mise à jour de l'état des recettes
    setRecipes(prevRecipes => {
      const updatedRecipes = [convertRecipes, ...prevRecipes]

      // Sauvegarde immédiate dans le localStorage
      try {
        const localRecettes = updatedRecipes
          .filter(recipe => !recipe.isDefault)
          .map(recipe => ({
            id: recipe.id,
            titre: recipe.title,
            description: recipe.description,
            difficulte: recipe.difficulty,
            tempsPreparation: recipe.prepTime,
            imageUrl: recipe.imageUrl,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            dateCreation: recipe.createdAt,
            likes: recipe.likes,
            views: recipe.views,
          }))
        // Conversion des recettes locales en JSON
        localStorage.setItem('recettes', JSON.stringify(localRecettes))
      } catch (error) {
        console.error(
          'Erreur lors de la sauvegarde de la nouvelle recette:',
          error
        )
      }

      return updatedRecipes
    })
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  // Valeur du contexte : un objet contenant les recettes, les statistiques, les fonctions d'ajout et de mise à jour
  const value = {
    recipes,
    loading,
    error,
    // likeRecipe,
    incrementViews,
    addRecipe,
    fetchRecipes,
  }

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider> // Fournir le contexte aux enfants
  )
}

// Hook personnalisé pour utiliser le contexte
export const useRecipes = () => {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error(
      "useRecipes doit être utilisé à l'intérieur d'un RecipesProvider"
    )
  }
  return context
}
