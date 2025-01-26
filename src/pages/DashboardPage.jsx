import React, { useState, useEffect } from 'react'
import BackButton from '../components/buttons/BackButton'
import { FaPlus, FaStar, FaChartPie, FaClock, FaListUl, FaTrash, FaPen } from 'react-icons/fa'
import DifficultyStars from '../components/ui/DifficultyStars'
import { useRecipes } from '../contexts/RecipesContext'

const DashboardPage = () => {
  const { recipes, addRecipe } = useRecipes()
  // État pour les recettes sauvegardées
  const [recettes, setRecettes] = useState(() => {
    try {
      const savedRecettes = localStorage.getItem('recettes')
      return savedRecettes ? JSON.parse(savedRecettes) : []
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error)
      return []
    }
  })

  const [nouvelleRecette, setNouvelleRecette] = useState({
    titre: '',
    description: '',
    difficulte: 1,
    tempsPreparation: '',
    ingredients: [''],
    instructions: [''],
    imageUrl: '/images/default-recipe.jpg'
  })

  // Calculer les statistiques basées sur les recettes sauvegardées
  const stats = {
    totalRecettes: recettes.length,
    recettesPopulaires: recettes.filter(r => r.difficulte <= 3).length,
    tempsPreparationMoyen: recettes.length 
      ? Math.round(recettes.reduce((acc, r) => acc + parseInt(r.tempsPreparation || 0), 0) / recettes.length)
      : 0,
    categoriesPopulaires: [
      { nom: 'Desserts', nombre: recettes.filter(r => r.titre?.toLowerCase().includes('dessert')).length },
      { nom: 'Plats principaux', nombre: recettes.filter(r => !r.titre?.toLowerCase().includes('dessert')).length },
      { nom: 'Entrées', nombre: recettes.filter(r => r.titre?.toLowerCase().includes('entrée')).length }
    ]
  }

  // Sauvegarder les recettes dans le localStorage et le context quand elles changent
  useEffect(() => {
    try {
      localStorage.setItem('recettes', JSON.stringify(recettes))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des recettes:', error)
    }
  }, [recettes])

  const ajouterIngredient = () => {
    setNouvelleRecette(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const ajouterInstruction = () => {
    setNouvelleRecette(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }))
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!nouvelleRecette.titre?.trim() || !nouvelleRecette.description?.trim()) {
      alert('Veuillez remplir au moins le titre et la description')
      return
    }

    // Créer un ID unique
    const newId = Date.now().toString()

    // Ajouter la nouvelle recette avec un ID unique et la date de création
    const nouvelleRecetteComplete = {
      ...nouvelleRecette,
      id: newId,
      dateCreation: new Date().toISOString(),
      ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''),
      instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== '')
    }

    // Mettre à jour la liste des recettes locales
    setRecettes(prev => [nouvelleRecetteComplete, ...prev])

    // Mettre à jour le localStorage
    try {
      localStorage.setItem('recettes', JSON.stringify([nouvelleRecetteComplete, ...recettes]))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des recettes:', error)
    }

    // Mettre à jour le RecipesContext avec le bon format
    const recetteFormatee = {
      id: newId,
      title: nouvelleRecette.titre,
      description: nouvelleRecette.description,
      difficulty: nouvelleRecette.difficulte,
      prepTime: parseInt(nouvelleRecette.tempsPreparation) || 0,
      imageUrl: nouvelleRecette.imageUrl,
      ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''),
      instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== ''),
      likes: 0,
      views: 0,
      category: 'Plat principal',
      author: 'Utilisateur',
      createdAt: new Date().toISOString()
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
      imageUrl: '/images/default-recipe.jpg'
    })
  }

  // Supprimer une recette
  const supprimerRecette = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      setRecettes(prev => prev.filter(r => r.id !== id))
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

      {/* Section Statistiques */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#2C3639]/95 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-[#A27B5C] rounded-full">
            <FaListUl className="w-6 h-6 text-[#DCD7C9]" />
          </div>
          <div>
            <p className="text-[#DCD7C9]/70 text-sm">Total des recettes</p>
            <p className="text-2xl font-bold text-[#DCD7C9]">{stats.totalRecettes}</p>
          </div>
        </div>
        <div className="bg-[#2C3639]/95 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-[#A27B5C] rounded-full">
            <FaChartPie className="w-6 h-6 text-[#DCD7C9]" />
          </div>
          <div>
            <p className="text-[#DCD7C9]/70 text-sm">Recettes populaires</p>
            <p className="text-2xl font-bold text-[#DCD7C9]">{stats.recettesPopulaires}</p>
          </div>
        </div>
        <div className="bg-[#2C3639]/95 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-[#A27B5C] rounded-full">
            <FaClock className="w-6 h-6 text-[#DCD7C9]" />
          </div>
          <div>
            <p className="text-[#DCD7C9]/70 text-sm">Temps moyen de préparation</p>
            <p className="text-2xl font-bold text-[#DCD7C9]">{stats.tempsPreparationMoyen} min</p>
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
              <label className="block text-[#DCD7C9] mb-2">Titre de la recette</label>
              <input
                type="text"
                className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none"
                value={nouvelleRecette.titre}
                onChange={(e) => setNouvelleRecette(prev => ({ ...prev, titre: e.target.value }))}
              />
            </div>

            {/* Difficulté */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">Difficulté</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((niveau) => (
                  <button
                    key={niveau}
                    type="button"
                    className={`p-2 rounded-full transition-all ${
                      nouvelleRecette.difficulte >= niveau
                        ? 'text-[#A27B5C] scale-110'
                        : 'text-[#DCD7C9]/30'
                    }`}
                    onClick={() => setNouvelleRecette(prev => ({ ...prev, difficulte: niveau }))}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            {/* Temps de préparation */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">Temps de préparation (minutes)</label>
              <input
                type="number"
                className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none"
                value={nouvelleRecette.tempsPreparation}
                onChange={(e) => setNouvelleRecette(prev => ({ ...prev, tempsPreparation: e.target.value }))}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#DCD7C9] mb-2">Description</label>
              <textarea
                className="w-full bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none min-h-[100px]"
                value={nouvelleRecette.description}
                onChange={(e) => setNouvelleRecette(prev => ({ ...prev, description: e.target.value }))}
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
                    onChange={(e) => {
                      const newIngredients = [...nouvelleRecette.ingredients]
                      newIngredients[index] = e.target.value
                      setNouvelleRecette(prev => ({ ...prev, ingredients: newIngredients }))
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
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#A27B5C] rounded-full text-[#DCD7C9] text-sm">
                      {index + 1}
                    </span>
                    <textarea
                      className="flex-grow bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none min-h-[60px]"
                      value={instruction}
                      onChange={(e) => {
                        const newInstructions = [...nouvelleRecette.instructions]
                        newInstructions[index] = e.target.value
                        setNouvelleRecette(prev => ({ ...prev, instructions: newInstructions }))
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
          {/* Catégories populaires */}
          <section className="bg-[#2C3639]/95 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-memoirs text-[#DCD7C9] border-b border-[#DCD7C9]/10 pb-2 mb-4">
              Catégories populaires
            </h2>
            <div className="space-y-3">
              {stats.categoriesPopulaires.map((categorie, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-[#DCD7C9]">{categorie.nom}</span>
                  <span className="px-3 py-1 bg-[#A27B5C] text-[#DCD7C9] rounded-full text-sm">
                    {categorie.nombre}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Liste des recettes */}
          <section className="bg-[#2C3639]/95 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-6">
            <h2 className="text-2xl font-memoirs text-[#DCD7C9] border-b border-[#DCD7C9]/10 pb-2">
              Mes recettes récentes
            </h2>
            <div className="space-y-4">
              {recettes.length === 0 ? (
                <p className="text-[#DCD7C9]/70 text-center italic">
                  Aucune recette créée pour le moment
                </p>
              ) : (
                recettes.map((recette) => (
                  <div key={recette.id} className="bg-[#3F4E4F]/30 rounded-lg p-4 flex gap-4">
                    <img
                      src={recette.imageUrl}
                      alt={recette.titre}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[#DCD7C9] font-semibold">{recette.titre}</h3>
                        <div className="flex gap-2">
                          <button 
                            className="p-2 text-[#DCD7C9]/70 hover:text-[#A27B5C] transition-colors"
                            onClick={() => alert('Fonctionnalité à venir')}
                          >
                            <FaPen className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 text-[#DCD7C9]/70 hover:text-red-500 transition-colors"
                            onClick={() => supprimerRecette(recette.id)}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[#DCD7C9]/70 text-sm line-clamp-2">
                        {recette.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <DifficultyStars difficulty={recette.difficulte} />
                        <span className="text-[#DCD7C9]/70 text-sm">
                          {recette.tempsPreparation} min
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
