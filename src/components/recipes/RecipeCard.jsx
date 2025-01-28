import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaEye, FaClock, FaArrowRight } from 'react-icons/fa'
import DifficultyStars from '../ui/DifficultyStars'
// Component RecipeCard
const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

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

  const handleCardClick = e => {
    // Empêcher la navigation si on clique sur un bouton ou un lien
    if (e.target.closest('button') || e.target.closest('a')) {
      return
    }
    navigate(`/recette/${recipe.id}`)
  }

  return (
    <article
      ref={cardRef}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col bg-linear-to-br from-[#2C3639]/90 to-[#3F4E4F] rounded-2xl border border-white/10 shadow-xl shadow-[#4A403A]/90 group transition-all duration-300 h-full cursor-pointer"
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
          className="img-cover transition-transform duration-300 group-hover:scale-110 rounded-2xl"
        />
        <div className="absolute inset-0 z-20 p-2">
          <DifficultyStars difficulty={recipe.difficulty} />
        </div>
      </figure>

      {/* Contenu */}
      <section className="flex flex-col flex-grow p-5">
        {/* Statistiques */}
        <article className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 sm:gap-2">
          {/* Likes */}
          <div
            className="flex-center bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20 shadow-xl shadow-[#4A403A]/90"
            aria-label={`${recipe.likes} likes`}
          >
            <FaHeart
              className="text-red-400 drop-shadow-sm text-sm"
              aria-hidden="true"
            />
            <span className="text-[#DCD7C9] text-sm font-medium ml-1">
              {recipe.likes}
            </span>
          </div>

          {/* Vues */}
          <div
            className="flex-center bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20 shadow-xl shadow-[#4A403A]/90"
            aria-label={`${recipe.views} vues`}
          >
            <FaEye
              className="text-blue-400 drop-shadow-sm text-sm"
              aria-hidden="true"
            />
            <span className="text-[#DCD7C9] text-sm font-medium ml-1">
              {recipe.views}
            </span>
          </div>
        </article>

        {/* Titre */}
        <h3 className="text-lg sm:text-xl font-bold text-[#A27B5C] brightness-140 mb-2 line-clamp-2 group-hover:text-white transition-colors duration-200">
          {recipe.title}
        </h3>
        {/* ___________________________________________________________________________ */}
        {/* Description */}
        <p className="text-xs sm:text-sm text-[#DCD7C9]/80 mb-4 border-t border-[#A27B5C] pt-2 line-clamp-2 group-hover:text-content transition-colors duration-200 flex-grow">
          {recipe.description}
        </p>

        {/* Pied de carte */}
        <footer className="flex-between mt-auto pt-2 border-t border-[#A27B5C]">
          {/* Temps de préparation */}
          <div
            className="icon-container sm:gap-2 text-[#DCD7C9]/70"
            aria-label={`Temps de préparation : ${recipe.prepTime} minutes`}
          >
            <FaClock
              className="text-xs sm:text-sm text-[#A27B5C] brightness-140"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm">{recipe.prepTime} min</span>
          </div>

          {/* Lien vers la recette */}
          <button
            onClick={e => {
              e.stopPropagation()
              navigate(`/recette/${recipe.id}`)
            }}
            className="btn-site"
          >
            Voir la recette
            <FaArrowRight className="text-xs mx-auto" />
          </button>
        </footer>
      </section>
    </article>
  )
}

export default RecipeCard
