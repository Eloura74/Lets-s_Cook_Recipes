//====================================
// Imports des dépendances
//====================================
import React, { useState, useEffect, useRef } from 'react'
import { useRecipes } from '../../contexts/RecipesContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEye } from 'react-icons/fa' // Import de l'icône FaEye
import DifficultyStars from '../ui/DifficultyStars'
//====================================
// Composant SearchBar
//====================================
const SearchBar = () => {
  //====================================
  // États et Contexte
  //====================================
  const [searchTerm, setSearchTerm] = useState('') // Stocke la valeur saisie par l'utilisateur dans la barre de recherche
  const [isOpen, setIsOpen] = useState(false) // Indique si la liste des résultats est visible
  const { recipes } = useRecipes() // Liste des recettes récupérée
  const searchRef = useRef(null) // détecter les clics en dehors de la barre de recherche

  //====================================
  // Fonctions utilitaires
  //====================================
  // Fonction de recherche qui vérifie si le texte de la recette (str) contient le texte recherché (search)
  const searchInString = (str, search) => {
    // Normalisation des caractères
    if (!str) return false

    const normalizedStr = str
      .toLowerCase() // minuscule
      .normalize('NFD') // ignore les accents
      .replace(/[\u0300-\u036f]/g, '') // supprimer les accents
    const normalizedSearch = search
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return normalizedStr.includes(normalizedSearch)
  }

  //====================================
  // Filtrage des recettes
  //====================================
  const filteredRecipes = recipes
    .filter(recipe => {
      // Si la barre de recherche est vide ou contient uniquement des espaces, aucune recette n'est affichée
      if (!searchTerm.trim()) return false

      // Vérifie si le texte recherché est présent dans le titre ou la description de la recette
      return searchInString(recipe.title, searchTerm) // Recherche dans le titre de la recette
      // searchInString(recipe.description, searchTerm) // Recherche dans la description de la recette
    })
    .slice(0, 5) // Limite le nombre de recettes affichées à 5 pour éviter une liste trop longue

  //====================================
  // Gestion des événements
  //====================================
  // Gestion du clic en dehors de la barre de recherche
  useEffect(() => {
    const handleClickOutside = event => {
      // Vérifie si le clic a été fait dans l'element de recherche
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mise à jour de la recherche
  const handleSearchChange = e => {
    // Fonction appelée à chaque frappe de clavier
    const value = e.target.value
    setSearchTerm(value) // MAJ de la valeur de recherche
    setIsOpen(value.trim().length > 0) // MAJ de l'état de l'ouverture de la barre de recherche
  }

  //====================================
  // Rendu du composant
  //====================================
  return (
    <section className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Formulaire de recherche */}
      <form className="relative" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search-recipe" className="sr-only">
          {' '}
          {/* Label accessible mais invisible */}
          Rechercher une recette
        </label>
        <input
          id="search-recipe"
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Rechercher une recette..."
          className="w-full px-4 sm:px-6 py-2 sm:py-3
                   bg-black/20 backdrop-blur-sm
                   rounded-full
                   text-[#DCD7C9] text-sm sm:text-base
                   placeholder-[#DCD7C9]/70
                   focus:outline-none focus:ring-2 focus:ring-[#DCD7C9]/50
                   shadow-xl shadow-[#DCD7C9]/60
                   border border-[#DCD7C9]/10"
        />
      </form>

      {/* Liste des résultats avec animation */}
      <AnimatePresence>
        {isOpen && filteredRecipes.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-[#2C3639]/95 backdrop-blur-sm rounded-2xl
                     shadow-xl border border-[#DCD7C9]/10 overflow-hidden"
          >
            <ul className="py-2">
              {filteredRecipes.map(recipe => (
                <li key={recipe.id}>
                  <Link
                    to={`/recette/${recipe.id}`}
                    className="flex items-center px-4 py-2 hover:bg-[#A27B5C]/20"
                    onClick={() => {
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                  >
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="ml-3 text-[#DCD7C9] flex items-center  flex-wrap gap-2">
                      <span className="font-medium">{recipe.title}</span>
                      <p>|</p>
                      <span className="flex items-center gap-1 text-sm">
                        <span className="text-red-400">❤️ {recipe.likes}</span>
                        <p>|</p>
                        <span className="flex items-center gap-1">
                          <FaEye className="text-blue-400 w-4 h-4" />
                          {recipe.views}
                          <p>|</p>
                          <span className="flex items-center gap-1">
                            <DifficultyStars difficulty={recipe.difficulty} />
                            {recipe.difficulty}
                          </span>
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SearchBar
