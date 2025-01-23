import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex justify-end items-center w-full sm:w-auto px-2 sm:px-4 md:pr-16 lg:pr-24"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher une recette..."
        className="w-full sm:w-64 md:w-72 lg:w-96 px-4 py-2 pr-10 
                 rounded-full border border-gray-300 focus:outline-none 
                 focus:border-gray-500 shadow-md"
      />
      <button
        type="submit"
        className="absolute right-4 sm:right-6 md:right-20 lg:right-28 
                 top-1/2 -translate-y-1/2 text-gray-400
                 hover:text-gray-600 transition-colors"
      >
        <FaSearch className="w-4 h-4" />
      </button>
    </form>
  )
}

export default SearchBar
