import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'
// import PopularRecipes from '../components/common/PopularRecipes'
import RecipeList from '../components/recipes/RecipeList'
import ScrollButton from '../components/buttons/ScrollButton'
import Footer from '../components/common/Footer'
const HomePage = () => {
  return (
    <main className="flex-grow ">
      {/* Hero Section */}

      {/* Liste des recettes */}
      <section
        className="relative container mx-auto backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-2xl shadow-[#4A403A] mt-4 p-6"
        aria-label="Liste des recettes"
      >
        <RecipeList />

        {/* Bouton retour haut avec icône FA */}
        <ScrollButton />
      </section>
      <Footer />
    </main>
  )
}

export default HomePage
