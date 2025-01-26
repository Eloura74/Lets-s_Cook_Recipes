import React, { useState, useEffect, useRef } from 'react'
import { useRecipes } from '../../contexts/RecipesContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { recipes } = useRecipes()
  const searchRef = useRef(null)

  // Fonction de recherche simplifiée
  const searchInString = (str, search) => {
    if (!str) return false
    const normalizedStr = str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    const normalizedSearch = search
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return normalizedStr.includes(normalizedSearch)
  }

  const filteredRecipes = recipes
    .filter(recipe => {
      if (!searchTerm.trim()) return false
      return (
        searchInString(recipe.title, searchTerm) ||
        searchInString(recipe.description, searchTerm)
      )
    })
    .slice(0, 5) // Limiter à 5 résultats

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = e => {
    const value = e.target.value
    setSearchTerm(value)
    setIsOpen(value.trim().length > 0)
  }

  return (
    <section className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form className="relative" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search-recipe" className="sr-only">
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
                   focus:outline-none focus:ring-2 focus:ring-[#DCD7C9]/50"
        />
      </form>

      <AnimatePresence>
        {isOpen && filteredRecipes.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-[#2C3639]/95 backdrop-blur-sm rounded-2xl
                     shadow-xl border border-[#DCD7C9]/10 overflow-hidden"
          >
            <ul className="divide-y divide-[#DCD7C9]/10 max-h-[60vh] overflow-y-auto">
              {filteredRecipes.map(recipe => (
                <li key={recipe.id}>
                  <Link
                    to={`/recette/${recipe.id}`}
                    className="block hover:bg-[#DCD7C9]/10 transition-colors"
                    onClick={() => {
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                  >
                    <article className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                      {recipe.imageUrl && (
                        <figure className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={e => {
                              e.target.src = '/placeholder-recipe.jpg'
                            }}
                          />
                        </figure>
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
