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
  const { recipes, addRecipe, deleteRecipe } = useRecipes()

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
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset

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
    // const nouvelleRecetteComplete = {
    //   ...nouvelleRecette, // Copie des propriétés de la nouvelle recette
    //   id: newId, // ID unique
    //   dateCreation: new Date().toISOString(), // Date de création
    //   ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''), // Ingrediants non vides
    //   instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== ''), // Instructions non vides
    // }

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
      deleteRecipe(id)
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
                recipes.map((recipe, index) => (
                  <article
                    key={index}
                    className="relative flex flex-col sm:flex-row items-start gap-4 p-4 bg-[#3F4E4F] rounded-lg hover:bg-[#3F4E4F]/80 transition-colors group"
                  >
                    {/* Image de la recette */}
                    <div className="w-full sm:w-32 md:w-40 aspect-video sm:aspect-square flex-shrink-0 relative rounded-lg overflow-hidden">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Informations de la recette */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        {/* Titre desktop et versions*/}
                        {/* <h3 className="text-xl font-semibold text-[#DCD7C9] sm:max-w-[120px] truncate sm:hidden">
                          {recipe.title}
                        </h3> */}
                        <h3 className="text-xl font-semibold text-[#DCD7C9] overflow-hidden ">
                          {recipe.title}
                        </h3>
                        <div className="flex gap-2">
                          {/* Bouton Editer */}
                          <button
                            className="p-2 text-[#DCD7C9] hover:text-[#A27B5C] transition-colors"
                            title="Modifier"
                          >
                            <FaPen className="w-4 h-4" />
                          </button>
                          {/* Bouton Supprimer */}
                          <button
                            onClick={() => supprimerRecette(recipe.id)}
                            className="p-2 text-red-500 hover:text-red-600 transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-[#DCD7C9]/80 text-sm line-clamp-2 mt-1">
                        {recipe.description}
                      </p>

                      {/* Ajout des étoiles de difficulté */}
                      <div className="mt-2">
                        <DifficultyStars difficulty={recipe.difficulty} />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        {/* Difficulté */}
                        <div className="flex items-center gap-1 text-[#DCD7C9]/60">
                          <FaClock className="w-4 h-4" />
                          <span>{recipe.prepTime} min</span>
                        </div>
                        {/* Likes */}
                        <div className="flex items-center gap-1">
                          <FaEye className="w-4 h-4 text-[#DCD7C9]/60" />
                          <span className="text-[#DCD7C9]/60">
                            {recipe.views || 0}
                          </span>
                        </div>
                        {/* Vues */}
                        <div className="flex items-center gap-1">
                          <FaHeart className="w-4 h-4 text-[#DCD7C9]/60" />
                          <span className="text-[#DCD7C9]/60">
                            {recipe.likes || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
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
