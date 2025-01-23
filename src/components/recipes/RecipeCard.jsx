import React, { useRef } from 'react'
// import { motion } from 'framer-motion' // Pour la version avec animation Framer Motion
import { FaClock, FaHeart, FaEye } from 'react-icons/fa'

const RecipeCard = ({ recipe }) => {
  // Référence pour manipuler la carte directement
  const cardRef = useRef(null)

  // Gestion du mouvement de la souris pour l'effet 3D
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Calcul de la rotation: -20 à +20 degrés en fonction de la position de la souris
    const rotateX = (mouseY / rect.height - 0.5) * -20
    const rotateY = (mouseX / rect.width - 0.5) * 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  // Réinitialisation de la rotation quand la souris quitte la carte
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-br from-[#2C3639]/90 to-[#3F4E4F] rounded-2xl border border-white/10 shadow-xl group"
      style={{
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Image de la recette avec overlay gradient */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        {/* Statistiques (likes et vues) */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          {/* Badge des likes */}
          <div className="flex items-center gap-1.5 bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20">
            <FaHeart className="text-red-400 drop-shadow" />
            <span className="text-[#DCD7C9] text-sm font-medium">
              {recipe.likes}
            </span>
          </div>

          {/* Badge des vues */}
          <div className="flex items-center gap-1.5 bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20">
            <FaEye className="text-blue-400 drop-shadow" />
            <span className="text-[#DCD7C9] text-sm font-medium">
              {recipe.views}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-5">
        {/* Titre */}
        <h3 className="text-xl font-memoirs text-[#DCD7C9] mb-2 line-clamp-1 group-hover:text-white transition-colors duration-200">
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#DCD7C9]/80 mb-4 line-clamp-2 group-hover:text-[#DCD7C9]/90 transition-colors duration-200">
          {recipe.description}
        </p>

        {/* Footer avec temps et bouton */}
        <div className="flex items-center justify-between">
          {/* Temps de préparation */}
          <div className="flex items-center gap-2 text-[#DCD7C9]/70">
            <FaClock className="text-sm" />
            <span className="text-sm">{recipe.prepTime} min</span>
          </div>

          {/* Bouton Voir la recette */}
          <button className="px-4 py-1.5 bg-[#3F4E4F] hover:bg-[#2C3639] text-[#DCD7C9] text-sm rounded-full transition-colors duration-200 shadow-md hover:shadow-lg border border-white/10">
            Voir la recette
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard

/* Version avec Framer Motion pour référence future
const RecipeCard = ({ recipe }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ type: 'tween', duration: 0.2 }}
      className="relative overflow-hidden bg-gradient-to-br from-[#2C3639]/90 to-[#3F4E4F] rounded-2xl border border-white/10 shadow-xl group"
    >
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            className="flex items-center gap-1.5 bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20"
          >
            <FaHeart className="text-red-400 drop-shadow" />
            <span className="text-[#DCD7C9] text-sm font-medium">{recipe.likes}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            className="flex items-center gap-1.5 bg-[#2C3639]/80 px-3 py-1.5 rounded-full border border-white/20"
          >
            <FaEye className="text-blue-400 drop-shadow" />
            <span className="text-[#DCD7C9] text-sm font-medium">{recipe.views}</span>
          </motion.div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-memoirs text-[#DCD7C9] mb-2 line-clamp-1 group-hover:text-white transition-colors duration-200">
          {recipe.title}
        </h3>

        <p className="text-sm text-[#DCD7C9]/80 mb-4 line-clamp-2 group-hover:text-[#DCD7C9]/90 transition-colors duration-200">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#DCD7C9]/70">
            <FaClock className="text-sm" />
            <span className="text-sm">{recipe.prepTime} min</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 bg-[#3F4E4F] hover:bg-[#2C3639] text-[#DCD7C9] text-sm rounded-full transition-colors duration-200 shadow-md hover:shadow-lg border border-white/10"
          >
            Voir la recette
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
*/
