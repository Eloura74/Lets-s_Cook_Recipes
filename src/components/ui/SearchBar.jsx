import React, { useState, useEffect, useRef } from 'react'
import { useRecipes } from '../../contexts/RecipesContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// logique pour afficher la barre de recherche
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('') // Stocke la valeur saisie par l'utilisateur dans la barre de recherche
  const [isOpen, setIsOpen] = useState(false) // Indique si la liste des résultats est visible
  const { recipes } = useRecipes() // Liste des recettes récupérée
  const searchRef = useRef(null) // détecter les clics en dehors de la barre de recherche

  // Fonction de recherche qui érifie si le texte de la recette (str) contient le texte recherché (search)
  const searchInString = (str, search) => {
    // Normalisation des caractere
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

  // Fonction pour filtrer les recettes affichées en fonction de la barre de recherche
  const filteredRecipes = recipes
    .filter(recipe => {
      // Si la barre de recherche est vide ou contient uniquement des espaces, aucune recette n'est affichée
      if (!searchTerm.trim()) return false

      // Vérifie si le texte recherché est présent dans le titre ou la description de la recette
      return searchInString(recipe.title, searchTerm) // Recherche dans le titre de la recette
      // searchInString(recipe.description, searchTerm) // Recherche dans la description de la recette
    })
    .slice(0, 5) // Limite le nombre de recettes affichées à 5 pour éviter une liste trop longue

  // Gestion du clic en dehors de la barre de recherche
  // Permet d'ajouter un comportement à déclencher après le rendu du composant comme clics en dehors de la barre de recherche
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

  // MAJ de la recehrche
  const handleSearchChange = e => {
    // Fonction appelée a chaques frappement de clavier

    const value = e.target.value
    setSearchTerm(value) // MAJ de la valeur de recherche
    setIsOpen(value.trim().length > 0) // MAJ de l'etat de l'ouverture de la barre de recherche
  }

  return (
    <section className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form className="relative" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search-recipe" className="sr-only">
          {' '}
          {/* Indique que l'input est invisible */}
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

      {/* Affichage des résultats de recherche */}
      {/* AnimatePresence permet d'animer l'entrée et la sortie des éléments */}
      <AnimatePresence>
        {/* Vérifie si l'ouverture de la barre de recherche est déclarée */}
        {isOpen && filteredRecipes.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-[#2C3639]/95 backdrop-blur-sm rounded-2xl
                     shadow-xl border border-[#DCD7C9]/10 overflow-hidden"
          >
            <ul className="divide-y divide-[#DCD7C9]/10 max-h-[60vh] overflow-y-auto">
              {/* map pour afficher chaque recette  */}
              {filteredRecipes.map(recipe => (
                <li key={recipe.id}>
                  <Link
                    to={`/recette/${recipe.id}`}
                    className="block hover:bg-[#DCD7C9]/10 transition-colors"
                    // Permet de fermer la barre de recherche lorsque l'utilisateur clique sur une recette
                    onClick={() => {
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                  >
                    <article className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                      {/* Affichage de l'image de la recette */}
                      {/* recipe.imageUrl signifie : si l'image de la recette existe */}
                      {recipe.imageUrl && (
                        <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={e => {
                              e.target.src = '/placeholder-recipe.jpg'
                            }}
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base text-[#DCD7C9] font-medium truncate">
                          {recipe.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#DCD7C9]/70 truncate">
                          {recipe.description}
                        </p>
                      </div>
                    </article>
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
