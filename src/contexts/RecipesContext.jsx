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
      // Charger les recettes du localStorage
      const savedRecettes = localStorage.getItem('recettes')
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
        createdAt: recette.dateCreation || new Date().toISOString()
      }))

      // Marquer les recettes par défaut
      const defaultRecipes = recipesData.map(recipe => ({
        ...recipe,
        isDefault: true
      }))

      // Combiner les recettes en donnant la priorité aux recettes locales
      const allRecipes = [...formattedLocalRecettes, ...defaultRecipes]

      // Supprimer les doublons en gardant la version locale si elle existe
      const uniqueRecipes = allRecipes.reduce((acc, recipe) => {
        const existingRecipe = acc.find(r => r.id === recipe.id)
        if (!existingRecipe) {
          acc.push(recipe)
        }
        return acc
      }, [])

      setRecipes(uniqueRecipes)
    } catch (err) {
      setError('Erreur lors du chargement des recettes')
      console.error('Erreur de chargement:', err)
    } finally {
      setLoading(false)
    }
  }

  // Charger les recettes au montage du composant
  useEffect(() => {
    fetchRecipes()
  }, [])

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

  // Fonction pour ajouter une nouvelle recette
  const addRecipe = newRecipe => {
    const normalizedRecipe = {
      ...newRecipe,
      likes: 0,
      views: 0,
      category: newRecipe.category || 'Plat principal',
      author: newRecipe.author || 'Utilisateur',
      createdAt: new Date().toISOString(),
      isDefault: false
    }
    setRecipes(prevRecipes => [normalizedRecipe, ...prevRecipes])
  }

  // Sauvegarder les recettes dans le localStorage quand elles changent
  useEffect(() => {
    try {
      const localRecettes = recipes
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
          views: recipe.views
        }))
      localStorage.setItem('recettes', JSON.stringify(localRecettes))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des recettes:', error)
    }
  }, [recipes])

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        loading,
        error,
        likeRecipe,
        incrementViews,
        addRecipe,
        fetchRecipes
      }}
    >
      {children}
    </RecipesContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useRecipes = () => {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error("useRecipes doit être utilisé à l'intérieur d'un RecipesProvider")
  }
  return context
}
