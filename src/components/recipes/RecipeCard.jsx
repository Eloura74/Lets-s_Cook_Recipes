import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaEye, FaClock } from 'react-icons/fa'
import DifficultyStars from '../ui/DifficultyStars'
// Component RecipeCard
const RecipeCard = ({ recipe }) => {
  const cardRef = useRef(null) // Utilisation de useRef pour récupérer la reference du composant
  const [rotation, setRotation] = useState({ x: 0, y: 0 }) // Utilisation de useState pour gestion de l'orientation

  const handleMouseMove = e => {
    // Fonction pour gestion de la souris
    if (!cardRef.current) return // Si la reference du composant n'existe pas, on sort de la fonction

    const rect = cardRef.current.getBoundingClientRect() // Recupération des dimensions du composant
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setRotation({ x: rotateX, y: rotateY }) // Application de l'orientation
  }

  const handleMouseLeave = () => {
    // Fonction pour gestion de la souris
    setRotation({ x: 0, y: 0 })
  }

  return (
    <Link to={`/recette/${recipe.id}`} className="block w-full h-full">
      <article
        ref={cardRef} // Utilisation de useRef pour récupérer la reference du composant
        onMouseMove={handleMouseMove} // Gestion de la souris
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col bg-linear-to-br from-[#2C3639]/90 to-[#3F4E4F] rounded-2xl border border-white/10 shadow-xl shadow-[#4A403A]/90 group transition-all duration-300 h-full"
        style={{
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Image et métadonnées */}
        <figure className="relative h-40 sm:h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-10"
            aria-hidden="true"
          />
          <img
            src={recipe.imageUrl}
            alt={`Présentation de ${recipe.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-2xl"
          />
          <div className="absolute inset-0 z-20 p-2">
            <DifficultyStars difficulty={recipe.difficulty} />
          </div>
        </figure>

        {/* Contenu */}
        <div className="flex flex-col flex-grow p-4">
          {/* Statistiques */}
          <aside className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 sm:gap-2">
            {/* Likes */}
            <div
              className="flex items-center gap-1.5 bg-[#2C3639]/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20"
              aria-label={`${recipe.likes} likes`} // Aria label pour les likes
            >
              <FaHeart
                className="text-red-400 drop-shadow-sm text-xs sm:text-sm"
                aria-hidden="true" // Aria hidden pour les lecteurs d'écran
              />
              <span className="text-[#DCD7C9] text-xs sm:text-sm font-medium">
                {recipe.likes}
              </span>
            </div>

            {/* Vues */}
            <div
              className="flex items-center gap-1.5 bg-[#2C3639]/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20"
              aria-label={`${recipe.views} vues`}
            >
              {/* Icône de vues */}
              <FaEye
                className="text-blue-400 drop-shadow-sm text-xs sm:text-sm"
                aria-hidden="true"
              />
              <span className="text-[#DCD7C9] text-xs sm:text-sm font-medium">
                {recipe.views}
              </span>
            </div>
          </aside>

          {/* Titre */}
          <h3 className="text-lg sm:text-xl font-semibold text-[#DCD7C9] mb-2 line-clamp-2 group-hover:text-white transition-colors duration-200">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#DCD7C9]/80 mb-4 border-t border-[#DCD7C9]/10 pt-2 line-clamp-2 group-hover:text-[#DCD7C9]/90 transition-colors duration-200 flex-grow">
            {recipe.description}
          </p>

          {/* Pied de carte */}
          <footer className="flex items-center justify-between mt-auto pt-2 border-t border-[#DCD7C9]/10">
            {/* Temps de préparation */}
            <div
              className="flex items-center gap-1 sm:gap-2 text-[#DCD7C9]/70"
              aria-label={`Temps de préparation : ${recipe.prepTime} minutes`}
            >
              <FaClock className="text-xs sm:text-sm" aria-hidden="true" />
              <span className="text-xs sm:text-sm">{recipe.prepTime} min</span>
            </div>

            {/* Lien vers la recette */}
            <button
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm btn-site hover:scale-105 transition-transform duration-300"
              onClick={e => e.preventDefault()}
            >
              Voir la recette
            </button>
          </footer>
        </div>
      </article>
    </Link>
  )
}

export default RecipeCard
