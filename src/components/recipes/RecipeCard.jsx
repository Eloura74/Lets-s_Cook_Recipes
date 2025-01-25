import React, { useRef } from 'react'
import { FaClock, FaHeart, FaEye } from 'react-icons/fa'
import DifficultyStars from '../ui/DifficultyStars'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  // Référence pour manipuler la carte directement
  const cardRef = useRef(null)

  // Gestion du mouvement de la souris pour l'effet 3D
  const handleMouseMove = e => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calcul de la rotation: -20 à +20 degrés en fonction de la position de la souris
    const rotateX = (mouseY / rect.height - 0.5) * -10
    const rotateY = (mouseX / rect.width - 0.5) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  // Réinitialisation de la rotation quand la souris quitte la carte
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-linear-to-br from-[#2C3639]/90 to-[#3F4E4F] rounded-2xl border border-white/10 shadow-xl group"
      style={{
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Image et métadonnées */}
      <figure className="relative h-48 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-10" aria-hidden="true" />
        <img
          src={recipe.imageUrl}
          alt={`Présentation de ${recipe.title}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />

        {/* Niveau de difficulté */}
        <figcaption className="absolute bottom-2 left-2 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <DifficultyStars difficulty={recipe.difficulty} />
        </figcaption>

        {/* Statistiques */}
        <aside className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          {/* Likes */}
          <div className="flex items-center gap-1.5 bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20" aria-label={`${recipe.likes} likes`}>
            <FaHeart className="text-red-400 drop-shadow-sm" aria-hidden="true" />
            <span className="text-[#DCD7C9] text-sm font-medium">
              {recipe.likes}
            </span>
          </div>

          {/* Vues */}
          <div className="flex items-center gap-1.5 bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20" aria-label={`${recipe.views} vues`}>
            <FaEye className="text-blue-400 drop-shadow-sm" aria-hidden="true" />
            <span className="text-[#DCD7C9] text-sm font-medium">
              {recipe.views}
            </span>
          </div>
        </aside>
      </figure>

      {/* Contenu de la carte */}
      <div className="p-5">
        {/* En-tête */}
        <header>
          <h3 className="text-4xl font-memoirs text-[#DCD7C9] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9),_0_0_20px_rgba(220,215,201,0.3)] mb-2 line-clamp-1 group-hover:text-white transition-colors duration-200 pointer-events-none">
            {recipe.title}
          </h3>
        </header>

        {/* Description */}
        <p className="text-sm text-[#DCD7C9]/80 mb-4 line-clamp-2 group-hover:text-[#DCD7C9]/90 transition-colors duration-200">
          {recipe.description}
        </p>

        {/* Pied de carte */}
        <footer className="flex items-center justify-between">
          {/* Temps de préparation */}
          <div className="flex items-center gap-2 text-[#DCD7C9]/70" aria-label={`Temps de préparation : ${recipe.prepTime} minutes`}>
            <FaClock className="text-sm" aria-hidden="true" />
            <span className="text-sm">{recipe.prepTime} min</span>
          </div>

          {/* Lien vers la recette */}
          <Link to={`/recette/${recipe.id}`} className="px-4 py-1.5 btn-site">
            Voir la recette
          </Link>
        </footer>
      </div>
    </article>
  )
}

export default RecipeCard
