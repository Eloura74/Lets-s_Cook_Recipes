//====================================
// Imports des dépendances
//====================================
import React, { useState, useEffect, useRef } from 'react'
import Footer from '../components/common/Footer'
import BackButton from '../components/buttons/BackButton'
import {
  FaPlus,
  FaListUl,
  FaTrash,
  FaPen,
  FaBook,
  FaUtensils,
  FaClipboardList,
  FaListAlt,
  FaHeart,
  FaEye,
  FaClock,
} from 'react-icons/fa'
import DifficultyStars from '../components/ui/DifficultyStars'
import { useRecipes } from '../contexts/RecipesContext'
import HomeButton from '../components/buttons/HomeButton'

//====================================
// Composant principal DashboardPage
//====================================
const DashboardPage = () => {
  const dashboardRef = useRef(null)
  // État local pour la nouvelle recette
  const [nouvelleRecette, setNouvelleRecette] = useState({
    titre: '',
    description: '',
    difficulte: 1,
    tempsPreparation: '',
    ingredients: [''],
    instructions: [''],
    imageUrl: '/images/newRecipes.webp',
  })

  // Récupération des recettes depuis le contexte
  const { recipes, addRecipe } = useRecipes()

  //====================================
  // Statistiques
  //====================================
  const stats = {
    totalRecettes: recipes.length, // Nombre total de recettes
  }

  //====================================
  // Gestion du scroll vers le tableau de bord
  //====================================
  useEffect(() => {
    if (dashboardRef.current) {
      const yOffset = -30 // Offset pour tenir compte du header fixe
      const element = dashboardRef.current
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      })
    }
  }, []) // Se déclenche une seule fois au montage

  //====================================
  // Gestionnaires d'événements
  //====================================
  // Fonction pour ajouter un ingrédient
  const ajouterIngredient = () => {
    setNouvelleRecette(prev => ({
      ...prev, // Copier toutes les propriétés de la recette
      ingredients: [...prev.ingredients, ''], // Ajouter un nouvel ingrédient
    }))
  }

  // Fonction pour ajouter une instruction
  const ajouterInstruction = () => {
    setNouvelleRecette(prev => ({
      ...prev, // Copier toutes les propriétés de la recette
      instructions: [...prev.instructions, ''], // Ajouter une nouvelle instruction
    }))
  }

  //====================================
  // Gestion de la soumission du formulaire
  //====================================
  const handleSubmit = e => {
    e.preventDefault() // Empecher la soumission par defaut

    // Vérifier si le titre et la description sont remplis
    if (
      !nouvelleRecette.titre?.trim() ||
      !nouvelleRecette.description?.trim() ||
      !nouvelleRecette.difficulte ||
      !nouvelleRecette.tempsPreparation?.trim() ||
      !nouvelleRecette.ingredients ||
      !nouvelleRecette.instructions ||
      !nouvelleRecette.imageUrl?.trim()
    ) {
      // Si pas rempli afficher une alerte
      alert('Veuillez remplir tout les champs')
      return
    }

    // Générer un ID unique
    const newId = Date.now().toString()

    //====================================
    // Création de la nouvelle recette
    //====================================
    const nouvelleRecetteComplete = {
      ...nouvelleRecette, // Copie des propriétés de la nouvelle recette
      id: newId, // ID unique
      dateCreation: new Date().toISOString(), // Date de création
      ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''), // Ingrediants non vides
      instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== ''), // Instructions non vides
    }

    //====================================
    // Formatage de la recette pour le contexte
    //====================================
    const recetteFormatee = {
      id: newId,
      title: nouvelleRecette.titre, // Titre de la recette
      description: nouvelleRecette.description, // Description de la recette
      difficulty: nouvelleRecette.difficulte, // Difficulte de la recette
      prepTime: parseInt(nouvelleRecette.tempsPreparation), // Temps de préparation
      imageUrl: nouvelleRecette.imageUrl, // URL de l'image
      ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''), // Ingrediants non vides
      instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== ''), // Instructions non vides
      likes: 0, // Nombre de likes
      views: 0, // Nombre de vues
      category: 'Plat principal', // Categorie
      author: 'Utilisateur', // Auteur
      createdAt: new Date().toISOString(), // Date de création
    }
    addRecipe(recetteFormatee)

    // Réinitialiser le formulaire apres creation
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

  //====================================
  // Gestion de la suppression
  //====================================
  const supprimerRecette = id => {
    // Fonction pour supprimer une recette
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      const updatedRecipes = recipes.filter(r => r.id !== id) // Filtrer les recettes sans la recette à supprimer
      localStorage.setItem('recettes', JSON.stringify(updatedRecipes)) // Mise à jour des recettes dans le localStorage
    }
  }

  //====================================
  // Rendu du composant
  //====================================
  return (
    <div className="space-y-8 w-full" ref={dashboardRef}>
      {/* En-tête */}
      <header className="flex items-center flex-col bg-[#2C3639]/25 rounded-4xl shadow-lg shadow-[#4A403A]">
        <div>
          <h1 className="text-5xl font-memoirs text-[#DCD7C9] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] mt-6">
            Tableau de bord
          </h1>
        </div>
        <div className="flex items-center gap-17 p-14 pb-8">
          <div className="w-32 ">
            <HomeButton />
          </div>
          <div className="w-32 flex justify-end">
            <BackButton />
          </div>
        </div>
      </header>

      {/* ____________________________________________________________________________
_________________________________________________________________________________ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne de gauche - Création de recette */}
        <section
          className="
         bg-[#2C3639]/95
         backdrop-blur-sm 
         rounded-lg 
         p-6
         shadow-xl
         shadow-[#4A403A]/90 
         space-y-6"
        >
          <h2 className="text-3xl text-center font-memoirs text-[#DCD7C9] border-t border-[#A27B5C]/60 border-b border-[#A27B5C] pb-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
            Créer une nouvelle recette
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Titre */}
            <div>
              <label className="title-dashboard-create">
                Titre de la recette
              </label>
              <input
                type="text"
                className="inputDashboard"
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
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create ">Difficulté</label>
              <p className="text-[#DCD7C9]/50 text-xs pl-6 mb-2">
                Selectionnez une difficulté en cliquant sur les étoiles
              </p>
              <div className="w-full flex justify-center bg-transparent">
                <DifficultyStars
                  difficulty={nouvelleRecette.difficulte}
                  onChange={niveau =>
                    setNouvelleRecette(prev => ({
                      ...prev,
                      difficulte: niveau,
                    }))
                  }
                  interactive={true}
                />
              </div>
            </div>

            {/* Temps de préparation */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">
                Temps de préparation (minutes)
              </label>
              <input
                type="number"
                className="inputDashboard"
                value={nouvelleRecette.tempsPreparation}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    tempsPreparation: e.target.value, // Mettre à jour le temps de préparation
                  }))
                }
              />
            </div>

            {/* Image URL */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">URL de l'image</label>
              <input
                type="text"
                className="inputDashboard"
                placeholder="URL de l'image"
                value={nouvelleRecette.imageUrl}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    imageUrl: e.target.value, // Mettre à jour l'URL de l'image
                  }))
                }
              />
              <p className="text-[#DCD7C9]/50 text-sm mt-1">
                Ne pas modifier pour utiliser l'image par défaut
              </p>
            </div>

            {/* Aperçu de l'image */}
            <div>
              <label className="title-dashboard-create text-center">
                Aperçu de l'image
              </label>
              <div className="relative w-full h-48 bg-[#3F4E4F] rounded-lg overflow-hidden shadow-xl shadow-[#4A403A]/90">
                <img
                  src={nouvelleRecette.imageUrl}
                  alt="Aperçu"
                  className="img-cover  "
                  onError={e => {
                    e.target.onerror = null
                    e.target.src = '/images/newRecipes.webp'
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">Description</label>
              <textarea
                className="inputDashboard min-h-[100px]"
                value={nouvelleRecette.description} // Afficher la description
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    description: e.target.value, // Mettre à jour la description
                  }))
                }
              />
            </div>

            {/* Ingrédients */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">Ingrédients</label>
              <div className="space-y-2">
                {nouvelleRecette.ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    className="inputDashboard"
                    value={ingredient}
                    onChange={e => {
                      const newIngredients = [...nouvelleRecette.ingredients] // Copier les ingrédients existants
                      newIngredients[index] = e.target.value // Mettre à jour l'ingrédient
                      setNouvelleRecette(prev => ({
                        ...prev,
                        ingredients: newIngredients, // Mettre à jour les ingrédients
                      }))
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={ajouterIngredient}
                  className="btn-site flex items-center gap-2"
                >
                  <FaPlus /> Ajouter un ingrédient
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="border-t border-[#A27B5C] pt-2 pb-6 border-b border-[#A27B5C] pt-2">
              <label className="title-dashboard-create text-center">
                Instructions
              </label>
              <div className="space-y-2">
                {nouvelleRecette.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex-center bg-[#A27B5C] rounded-full text-[#DCD7C9] text-sm">
                      {index + 1}
                    </span>
                    <textarea
                      className="flex-grow bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none min-h-[60px] inputDashboard"
                      value={instruction}
                      onChange={e => {
                        const newInstructions = [
                          ...nouvelleRecette.instructions,
                        ]
                        newInstructions[index] = e.target.value
                        setNouvelleRecette(prev => ({
                          ...prev,
                          instructions: newInstructions, // Mettre à jour les instructions
                        }))
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={ajouterInstruction}
                  className="btn-site flex items-center gap-2"
                >
                  <FaPlus /> Ajouter une instruction
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="btn-site flex items-center gap-2 justify-center w-full"
            >
              Créer la recette
            </button>
          </form>
        </section>
        {/* ____________________________________________________________________________
________________________________________________________________________________ */}
        {/* Colonne de droite */}
        <div className="space-y-8">
          {/* Liste des recettes */}
          <section className="bg-[#2C3639]/95 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-6">
            <h2 className="text-3xl text-center font-memoirs text-[#DCD7C9] border-t border-[#A27B5C]/60 border-b border-[#A27B5C] pb-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
              Mes recettes récentes
            </h2>
            {/* Total des recettes */}
            <div className="flex items-center justify-center w-fit mx-auto flex-wrap gap-3  p-4 rounded-full border-b border-[#A27B5C]/60 pb-2">
              <FaClipboardList className="w-6 h-6 text-[#DCD7C9]" />

              <p className="text-[#DCD7C9]/70 text-sm underline">
                Total des recettes
              </p>
              <p className="text-2xl font-bold text-[#DCD7C9]">
                {stats.totalRecettes}
              </p>
            </div>

            <div className="space-y-4">
              {/* Gestion si aucune recette créée */}
              {recipes.length === 0 ? (
                <p className="text-[#DCD7C9]/70 text-center italic">
                  Aucune recette créée pour le moment
                </p>
              ) : (
                // sinon afficher les recettes
                recipes.map(recipe => (
                  <div
                    key={recipe.id}
                    className="bg-[#3F4E4F]/30 rounded-lg p-2 flex flex-col sm:flex-row  sm:gap-4 scale-98 hover:scale-100 transition-transform duration-300 shadow-xl shadow-[#4A403A]/90"
                  >
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      aria-label={recipe.title}
                      className="shadow-2xl shadow-[#DCD7C9]/20 w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg border border-[#DCD7C9]/40"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-[#DCD7C9]  text-xl font-semibold truncate">
                          {recipe.title}
                        </h3>
                        <div className="flex gap-1 shrink-0">
                          {/* Bouton Editer */}
                          <button
                            className="button-reset p-1 sm:p-2 text-[#DCD7C9]/70 "
                            onClick={() => alert('Fonctionnalité à venir')}
                          >
                            <FaPen className="w-3 h-3 sm:w-4 sm:h-4 text-[#DCD7C9]/70 shadow-sm hover:text-[#A27B5C]" />
                          </button>
                          {/* Bouton Supprimer */}
                          <button
                            className="button-reset p-1 sm:p-2 text-[#DCD7C9]/70 "
                            onClick={() => supprimerRecette(recipe.id)}
                          >
                            <FaTrash className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 shadow-sm hover:text-red-600 " />
                          </button>
                        </div>
                      </div>
                      <p className="text-[#DCD7C9]/70 text-xs sm:text-sm line-clamp-2">
                        {recipe.description}
                      </p>
                      <div className="flex sm:flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                        {/* Difficulté */}
                        <DifficultyStars difficulty={recipe.difficulty} />

                        {/* Temp préparation */}
                        <span className="text-[#DCD7C9]/70 text-xs sm:text-sm">
                          {recipe.prepTime} min
                        </span>
                        {/* Likes */}
                        <FaHeart className="text-red-500/50" />
                        <span className="text-sm">{recipe.likes}</span>
                        {/* Vues */}
                        <FaEye className="text-[#A27B5C]" />
                        <span className="text-sm">{recipe.views}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardPage
