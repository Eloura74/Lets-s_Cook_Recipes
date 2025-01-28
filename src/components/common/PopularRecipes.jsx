import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHeart, FaEye, FaStopwatch } from 'react-icons/fa'
import DifficultyStars from '../ui/DifficultyStars'

// logique pour afficher les recettes populaires
const PopularRecipes = ({ recipes }) => {
  // Vérifier si recipes existe et contient des données
  if (!recipes || recipes.length === 0) {
    return null // Ne rien afficher si pas de recettes
  }

  // Tri des recettes par nombre de likes
  const topRecipes = [...recipes]
    .sort((a, b) => Number(b.likes) - Number(a.likes))
    // Afficher les trois recettes les plus populaires
    .slice(0, 3)

  return (
    <section className="background-principale  py-6">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="
    relative 
    text-3xl
    font-memoirs
    brightness-180
    pt-2
    mb-4
    text-transparent
    bg-clip-text
    bg-center bg-no-repeat
    bg-[radial-gradient(circle,rgba(255,255,255,0.8)_20%,rgba(255,255,255,0)_80%)]
    inline-block
    shimmer-center 
  "
          >
            Nos Recettes Populaires
          </h2>

          <div className="w-24 h-1 bg-[#A27B5C] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {topRecipes.map((recipe, index) => (
            // Animation pour chaque recette populaire
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              {/* Contenu de la recette avec son id */}
              <Link to={`/recette/${recipe.id}`} className="block">
                <div className="relative rounded-xl overflow-hidden transform group-hover:scale-108 transition-transform duration-300 ring-0">
                  {/* Badge de classement */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-[#A27B5C] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      #{index + 1}
                    </div>
                  </div>

                  {/* Image principale */}
                  <div className="aspect-[4/3] relative">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="img-cover"
                      onError={e => {
                        e.target.onerror = null
                        e.target.src = '/images/detailRecipe.webp'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Contenu */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Titre */}
                    <h3 className="text-xl font-memoirs text-white mb-3 group-hover:text-[#A27B5C] transition-colors">
                      {recipe.title}
                    </h3>

                    {/* Infos */}
                    <div className="flex items-center gap-4 text-[#DCD7C9] mb-3">
                      {/* Temps de préparation */}
                      <div className="icon-container">
                        <FaStopwatch className="text-[#A27B5C]" />
                        <span className="text-sm">{recipe.prepTime} min</span>
                      </div>

                      {/* Likes */}
                      <div className="icon-container">
                        <FaHeart className="text-[#A27B5C]" />
                        <span className="text-sm">{recipe.likes}</span>
                      </div>

                      {/* Vues */}
                      <div className="icon-container">
                        <FaEye className="text-[#A27B5C]" />
                        <span className="text-sm">{recipe.views}</span>
                      </div>
                    </div>

                    {/* Difficulté */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#DCD7C9] pl-4 text-sm">
                        Difficulté:
                      </span>
                      <DifficultyStars
                        difficulty={recipe.difficulty}
                        size="sm"
                        className="opacity-90"
                      />
                    </div>
                  </div>

                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default PopularRecipes
