import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollButton = () => {
  // État pour gérer la visibilité du bouton
  const [isVisible, setIsVisible] = useState(false)

  // Fonction de détection du défilement
  useEffect(() => {
    const switchVisible = () => {
      console.log('Scroll position:', window.scrollY) // Debug : Affiche la position du scroll
      if (window.scrollY > 0) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Ajouter l'écouteur pour détecter le défilement
    window.addEventListener('scroll', switchVisible)

    // Nettoyage lors du démontage du composant
    return () => window.removeEventListener('scroll', switchVisible)
  }, [])

  // Fonction pour remonter en haut de la page
  const scrollHaut = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollHaut}
      className={`btn-site-top flex justify-end items-center ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Retour en haut"
    >
      <FaArrowUp className="w-8 h-8" />
    </button>
  )
}

export default ScrollButton
