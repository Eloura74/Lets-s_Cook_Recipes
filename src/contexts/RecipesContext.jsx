import React, { createContext, useContext, useState, useEffect } from 'react'
import recipesData from '../data/recettes.json'

// Création du contexte
const RecipesContext = createContext()

// Fonction pour fournir les recettes
export const RecipesProvider = ({ children }) => {
  // Utilisation de children pour permettre l'utilisation de la fonctionnalité des enfants
  const [recipes, setRecipes] = useState([]) // Etat pour stocker les recettes
  const [loading, setLoading] = useState(true) // Etat pour indiquer l'état de chargement

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
      console.error('Erreur de chargement :', err)
      // En cas d'erreur, charger au moins les recettes par défaut
      setRecipes(recipesData)
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour incrémenter les vues
  const incrementViews = recipeId => {
    try {
      // Met à jour l'état des recettes
      setRecipes(prevRecipes => {
        // Parcourt toutes les recettes pour trouver celle correspondant à l'ID fourni
        const updatedRecipes = prevRecipes.map(recipe => {
          if (recipe.id === recipeId) {
            // Crée une copie de la recette en incrémentant le nombre de vues
            const updatedRecipe = { ...recipe, views: (recipe.views || 0) + 1 }

            // Vérifie si la recette n'est pas une recette par défaut (modifiable)
            if (!recipe.isDefault) {
              // Récupère les recettes sauvegardées dans le localStorage
              const savedRecettes = JSON.parse(
                localStorage.getItem('recettes') || '[]' // Si aucune donnée, retourne un tableau vide
              )

              // Met à jour les recettes sauvegardées en incrémentant les vues de la recette concernée
              const updatedSavedRecettes = savedRecettes.map(
                r =>
                  r.id === recipeId
                    ? { ...r, views: updatedRecipe.views } // Met à jour la recette dans le localStorage
                    : r // Laisse les autres recettes inchangées
              )

              // Sauvegarde les recettes mises à jour dans le localStorage
              localStorage.setItem(
                'recettes',
                JSON.stringify(updatedSavedRecettes)
              )
            }

            // Retourne la recette mise à jour
            return updatedRecipe
          }

          // Retourne la recette inchangée si ce n'est pas celle qu'on cherche
          return recipe
        })

        // Retourne le tableau de recettes mis à jour
        return updatedRecipes
      })
    } catch (err) {
      // Affiche une erreur si un problème survient dans la mise à jour des vues
      console.error('Erreur lors de la mise à jour des vues :', err)
    }
  }

  // Fonction pour ajouter une nouvelle recette
  const addRecipe = newRecipe => {
    try {
      // Préparer les données de la nouvelle recette
      const convertRecipes = {
        ...newRecipe, // Copie toutes les données de la nouvelle recette
        likes: 0, // Initialise les likes à 0
        views: 0, // Initialise les vues à 0
        category: newRecipe.category || 'Plat principal', // Définit une catégorie par défaut si aucune n'est fournie
        author: newRecipe.author || 'Utilisateur', // Définit un auteur par défaut si aucun n'est fourni
        createdAt: new Date().toISOString(), // Ajoute une date de création (format ISO)
        isDefault: false, // Indique que cette recette n'est pas une recette par défaut
      }

      // Met à jour l'état des recettes
      setRecipes(prevRecipes => {
        // Ajoute la nouvelle recette au début de la liste des recettes existantes
        const updatedRecipes = [convertRecipes, ...prevRecipes]

        // Prépare les recettes à sauvegarder dans le localStorage
        const localRecettes = updatedRecipes
          // Filtrer les recettes pour exclure celles qui sont marquées comme "par défaut"
          .filter(recipe => !recipe.isDefault)
          // Formater les données pour le stockage local
          .map(recipe => ({
            id: recipe.id, // Identifiant unique de la recette
            titre: recipe.title, // Titre de la recette
            description: recipe.description, // Description de la recette
            difficulte: recipe.difficulty, // Niveau de difficulté
            tempsPreparation: recipe.prepTime, // Temps de préparation
            imageUrl: recipe.imageUrl, // URL de l'image associée
            ingredients: recipe.ingredients, // Liste des ingrédients
            instructions: recipe.instructions, // Instructions de préparation
            dateCreation: recipe.createdAt, // Date de création
            likes: recipe.likes, // Nombre de likes
            views: recipe.views, // Nombre de vues
          }))

        // Sauvegarde les recettes formatées dans le localStorage
        localStorage.setItem('recettes', JSON.stringify(localRecettes))

        // Retourne la liste des recettes mise à jour
        return updatedRecipes
      })
    } catch (err) {
      // Affiche un message d'erreur en cas de problème
      console.error("Erreur lors de l'ajout de la recette :", err)
    }
  }

  const value = {
    recipes, // Liste des recettes
    loading, // Etat de chargement
    incrementViews, // Fonction pour incrémenter les vues
    addRecipe, // Fonction pour ajouter une nouvelle recette
    fetchRecipes, // Fonction pour charger les recettes
  }

  return (
    // Fournir le contexte aux composants enfants
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useRecipes = () => {
  // Utilise le contexte
  const context = useContext(RecipesContext)
  // Si le contexte n'existe pas, lance une erreur
  if (!context) {
    throw new Error(
      "useRecipes doit être utilisé à l'intérieur d'un RecipesProvider"
    )
  }
  return context
}
