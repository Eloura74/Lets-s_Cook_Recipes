import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
// import PopularRecipes from '../components/common/PopularRecipes'
import RecipeList from '../components/recipes/RecipeList'
import ScrollButton from '../components/buttons/ScrollButton'
import Footer from '../components/common/Footer'

const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    // Vérifie si on a un hash dans l'URL (par exemple #filtres-recettes)
    if (location.hash) {
      // Petit délai pour s'assurer que le DOM est chargé
      setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          const yOffset = -100 // Offset pour le header fixe
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset
          window.scrollTo({
            top: y,
            behavior: 'smooth',
          })
        }
      }, 100)
    }
  }, [location])

  return (
    <main className="flex-grow bg-[#2C3639]/95">
      {/* Hero Section */}

      {/* Liste des recettes */}
      <section
        className="relative container mx-auto backdrop-blur-[10px] bg-transparent rounded-2xl shadow-2xl shadow-[#4A403A] mt-4 p-6"
        aria-label="Liste des recettes"
      >
        <RecipeList />

        {/* Bouton retour haut avec icône FA */}
        <ScrollButton />
      </section>
      {/* Footer */}
      <Footer />
    </main>
  )
}

export default HomePage
