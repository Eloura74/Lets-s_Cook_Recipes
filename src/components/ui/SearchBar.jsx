import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = e => {
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
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Rechercher une recette..."
        className="w-full sm:w-64 md:w-72 lg:w-96 px-6 py-3
                 bg-black/20 backdrop-blur-sm
                 text-[#DCD7C9] placeholder-[#DCD7C9]/60
                 rounded-full border border-[#DCD7C9]/30
                 focus:border-[#DCD7C9]/60 focus:outline-none
                 shadow-[0_0_15px_rgba(220,215,201,0.1)]
                 transition-all duration-300
                 hover:shadow-[0_0_20px_rgba(220,215,201,0.2)]"
      />
      <button
        type="submit"
        className="absolute right-6 sm:right-8 md:right-20 lg:right-28 
                 top-1/2 -translate-y-1/2 
                 text-[#DCD7C9]/70 hover:text-[#DCD7C9] 
                 transition-colors duration-300"
      >
        <FaSearch className="w-5 h-5" />
      </button>
    </form>
  )
}

export default SearchBar
