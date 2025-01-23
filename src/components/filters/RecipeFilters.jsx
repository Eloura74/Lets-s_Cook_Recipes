import React from 'react'
import { FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'

const RecipeFilters = ({ onSearch, onFilterChange, currentFilter }) => {
  const filters = [
    {
      id: 'recent',
      label: 'Plus récent',
      icon: FaSortAmountDown
    },
    {
      id: 'ancien',
      label: 'Plus ancien',
      icon: FaSortAmountUp
    },
    {
      id: 'az',
      label: 'A-Z',
      icon: FaSortAlphaDown
    },
    {
      id: 'za',
      label: 'Z-A',
      icon: FaSortAlphaUp
    }
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
      {/* <div className="w-full md:w-1/3">
                <input
                    type="text"
                    placeholder="Rechercher une recette..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div> */}
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-memoirs
                     transition-all duration-300 hover:shadow-md
                     ${
                       currentFilter === filter.id
                         ? 'bg-gray-700 text-white shadow-lg scale-105'
                         : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
                     }`}
        >
          <filter.icon className={`w-4 h-4 ${
            currentFilter === filter.id ? 'text-white' : 'text-gray-600'
          }`} />
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  )
}

export default RecipeFilters
