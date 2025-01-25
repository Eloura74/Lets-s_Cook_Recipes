import React, { useState, useEffect, useRef } from 'react'
import { useRecipes } from '../../contexts/RecipesContext'
import { Link } from 'react-router-dom'
import { FaSearch, FaClock, FaHeart } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { recipes } = useRecipes()
  const searchRef = useRef(null)

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5) // Limiter à 5 résultats

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setIsOpen(e.target.value.length > 0)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Rechercher une recette..."
          className="w-full px-6 py-3
                   bg-black/20 backdrop-blur-sm
                   text-[#DCD7C9] placeholder-[#DCD7C9]/60
                   rounded-full border border-[#DCD7C9]/30
                   focus:border-[#DCD7C9]/60 focus:outline-none
                   shadow-[0_0_15px_rgba(220,215,201,0.1)]
                   transition-all duration-300
                   hover:shadow-[0_0_20px_rgba(220,215,201,0.2)]"
        />
        <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DCD7C9]/70" />
      </div>

      <AnimatePresence>
        {isOpen && filteredRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 left-0 right-0 mt-2 bg-[#2C3639]/95 backdrop-blur-md rounded-xl 
                     shadow-xl border border-[#DCD7C9]/10 overflow-hidden"
          >
            <div className="divide-y divide-[#DCD7C9]/10">
              {filteredRecipes.map(recipe => (
                <Link
                  key={recipe.id}
                  to={`/recette/${recipe.id}`}
                  className="block hover:bg-[#A27B5C]/20 transition-colors duration-200"
                  onClick={() => {
                    setIsOpen(false)
                    setSearchTerm('')
                  }}
                >
                  <div className="p-4 flex items-center gap-4">
                    {/* Image de la recette */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.onerror = null
                          e.target.src = '/images/detailRecipe.webp'
                        }}
                      />
                    </div>

                    {/* Informations de la recette */}
                    <div className="flex-grow">
                      <h3 className="text-[#DCD7C9] font-medium text-lg">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-[#DCD7C9]/70">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-[#A27B5C]" />
                          <span>{recipe.prepTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaHeart className="text-[#A27B5C]" />
                          <span>{recipe.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge ID */}
                    <div className="text-[#DCD7C9]/40 text-sm">
                      #{recipe.id}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar
