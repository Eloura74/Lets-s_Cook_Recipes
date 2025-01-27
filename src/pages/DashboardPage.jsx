import React, { useState } from 'react'
import BackButton from '../components/buttons/BackButton'
import {
  FaPlus,
  FaStar,
  FaChartPie,
  FaClock,
  FaListUl,
  FaTrash,
  FaPen,
} from 'react-icons/fa'
import DifficultyStars from '../components/ui/DifficultyStars'
import { useRecipes } from '../contexts/RecipesContext'

const DashboardPage = () => {
  const { recipes, addRecipe } = useRecipes()

  // État initial pour une nouvelle recette
  const [nouvelleRecette, setNouvelleRecette] = useState({
    titre: '',
    description: '',
    difficulte: 1,
    tempsPreparation: '',
    ingredients: [''],
    instructions: [''],
    imageUrl: '/images/newRecipes.webp',
  })

  // Calculer les statistiques basées sur les recettes du contexte
  const stats = {
    totalRecettes: recipes.length,
  }

  // Fonction pour ajouter un ingrédient
  const ajouterIngredient = () => {
    setNouvelleRecette(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ''],
    }))
  }

  // Fonction pour ajouter une instruction
  const ajouterInstruction = () => {
    setNouvelleRecette(prev => ({
      ...prev,
      instructions: [...prev.instructions, ''],
    }))
  }

  // Gérer la soumission du formulaire
  const handleSubmit = e => {
    e.preventDefault()

    if (
      !nouvelleRecette.titre?.trim() ||
      !nouvelleRecette.description?.trim()
    ) {
      alert('Veuillez remplir au moins le titre et la description')
      return
    }

    // Générer un ID unique
    const newId = Date.now().toString()

    // Créer la recette complète
    const nouvelleRecetteComplete = {
      ...nouvelleRecette,
      id: newId,
      dateCreation: new Date().toISOString(),
      ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''),
      instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== ''),
    }

    // Formater la recette pour le contexte
    const recetteFormatee = {
      id: newId,
      title: nouvelleRecette.titre,
      description: nouvelleRecette.description,
      difficulty: nouvelleRecette.difficulte,
      prepTime: parseInt(nouvelleRecette.tempsPreparation),
      imageUrl: nouvelleRecette.imageUrl,
      ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''),
      instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== ''),
      likes: 0,
      views: 0,
      category: 'Plat principal',
      author: 'Utilisateur',
      createdAt: new Date().toISOString(),
    }
    addRecipe(recetteFormatee)

    // Réinitialiser le formulaire
    setNouvelleRecette({
      titre: '',
      description: '',
      difficulte: 1,
      tempsPreparation: '',
      ingredients: [''],
      instructions: [''],
      imageUrl: '/images/newRecipes.webp',
    })
  }

  // Supprimer une recette
  const supprimerRecette = id => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      const updatedRecipes = recipes.filter(r => r.id !== id)
      localStorage.setItem('recettes', JSON.stringify(updatedRecipes))
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <header className="flex justify-between items-center bg-[#2C3639]/95 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-memoirs text-[#DCD7C9] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
          Tableau de bord
        </h1>
        <BackButton />
      </header>

      {/* Statistiques */}
      <section className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-[#2C3639]/95 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-[#A27B5C]/20 rounded-full">
            <FaListUl className="w-6 h-6 text-[#DCD7C9]" />
          </div>
          <div>
            <p className="text-[#DCD7C9]/70 text-sm">Total des recettes</p>
            <p className="text-2xl font-bold text-[#DCD7C9]">
              {stats.totalRecettes}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne de gauche - Création de recette */}
        <section className="bg-[#2C3639]/95 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-6">
          <h2 className="text-2xl font-memoirs text-[#DCD7C9] border-b border-[#DCD7C9]/10 pb-2">
            Créer une nouvelle recette
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Titre */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">
                Titre de la recette
              </label>
              <input
                type="text"
                className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none"
                value={nouvelleRecette.titre}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    titre: e.target.value,
                  }))
                }
              />
            </div>

            {/* Difficulté */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">Difficulté</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(niveau => (
                  <button
                    key={niveau}
                    type="button"
                    className={`p-2 rounded-full transition-all ${
                      nouvelleRecette.difficulte >= niveau
                        ? 'text-[#A27B5C] scale-110'
                        : 'text-[#DCD7C9]/30'
                    }`}
                    onClick={() =>
                      setNouvelleRecette(prev => ({
                        ...prev,
                        difficulte: niveau,
                      }))
                    }
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            {/* Temps de préparation */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">
                Temps de préparation (minutes)
              </label>
              <input
                type="number"
                className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none"
                value={nouvelleRecette.tempsPreparation}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    tempsPreparation: e.target.value,
                  }))
                }
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">
                URL de l'image
              </label>
              <input
                type="text"
                className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none"
                placeholder="URL de l'image"
                value={nouvelleRecette.imageUrl}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
              />
              <p className="text-[#DCD7C9]/50 text-sm mt-1">
                Laissez vide pour utiliser l'image par défaut
              </p>
            </div>

            {/* Aperçu de l'image */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">
                Aperçu de l'image
              </label>
              <div className="relative w-full h-48 bg-[#3F4E4F] rounded-lg overflow-hidden">
                <img
                  src={nouvelleRecette.imageUrl}
                  alt="Aperçu"
                  className="img-cover"
                  onError={e => {
                    e.target.onerror = null
                    e.target.src = '/images/newRecipes.webp'
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">Description</label>
              <textarea
                className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none min-h-[100px]"
                value={nouvelleRecette.description}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Ingrédients */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">Ingrédients</label>
              <div className="space-y-2">
                {nouvelleRecette.ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none"
                    value={ingredient}
                    onChange={e => {
                      const newIngredients = [...nouvelleRecette.ingredients]
                      newIngredients[index] = e.target.value
                      setNouvelleRecette(prev => ({
                        ...prev,
                        ingredients: newIngredients,
                      }))
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={ajouterIngredient}
                  className="flex items-center gap-2 text-[#DCD7C9]/80 hover:text-[#DCD7C9] transition-colors"
                >
                  <FaPlus /> Ajouter un ingrédient
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">Instructions</label>
              <div className="space-y-2">
                {nouvelleRecette.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex-center bg-[#A27B5C] rounded-full text-[#DCD7C9] text-sm">
                      {index + 1}
                    </span>
                    <textarea
                      className="flex-grow bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none min-h-[60px]"
                      value={instruction}
                      onChange={e => {
                        const newInstructions = [
                          ...nouvelleRecette.instructions,
                        ]
                        newInstructions[index] = e.target.value
                        setNouvelleRecette(prev => ({
                          ...prev,
                          instructions: newInstructions,
                        }))
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={ajouterInstruction}
                  className="flex items-center gap-2 text-[#DCD7C9]/80 hover:text-[#DCD7C9] transition-colors"
                >
                  <FaPlus /> Ajouter une instruction
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#A27B5C] text-[#DCD7C9] rounded-lg hover:bg-[#A27B5C]/90 transition-colors font-semibold"
            >
              Créer la recette
            </button>
          </form>
        </section>

        {/* Colonne de droite */}
        <div className="space-y-8">
          {/* Liste des recettes */}
          <section className="bg-[#2C3639]/95 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-6">
            <h2 className="text-2xl font-memoirs text-[#DCD7C9] border-b border-[#DCD7C9]/10 pb-2">
              Mes recettes récentes
            </h2>
            <div className="space-y-4">
              {recipes.length === 0 ? (
                <p className="text-[#DCD7C9]/70 text-center italic">
                  Aucune recette créée pour le moment
                </p>
              ) : (
                recipes.map(recipe => (
                  <div
                    key={recipe.id}
                    className="bg-[#3F4E4F]/30 rounded-lg p-4 flex gap-4"
                  >
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[#DCD7C9] font-semibold">
                          {recipe.title}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-[#DCD7C9]/70 hover:text-[#A27B5C] transition-colors"
                            onClick={() => alert('Fonctionnalité à venir')}
                          >
                            <FaPen className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-[#DCD7C9]/70 hover:text-red-500 transition-colors"
                            onClick={() => supprimerRecette(recipe.id)}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[#DCD7C9]/70 text-sm line-clamp-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <DifficultyStars difficulty={recipe.difficulty} />
                        <span className="text-[#DCD7C9]/70 text-sm">
                          {recipe.prepTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
