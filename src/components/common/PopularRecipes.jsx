import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHeart, FaEye, FaStopwatch } from 'react-icons/fa'
import DifficultyStars from '../ui/DifficultyStars'

const PopularRecipes = ({ recipes }) => {
  // Vérifier si recipes existe et contient des données
  if (!recipes || recipes.length === 0) {
    return null // Ne rien afficher si pas de recettes
  }

  const topRecipes = [...recipes]
    .sort((a, b) => Number(b.likes) - Number(a.likes))
    .slice(0, 3)

  console.log(
    'Recettes triées :',
    topRecipes.map(r => ({ title: r.title, likes: r.likes }))
  )

  return (
    <div className="background-principale  py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-memoirs text-[#DCD7C9] pt-4 mb-4">
            Nos Recettes Populaires
          </h2>
          <div className="w-24 h-1 bg-[#A27B5C] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {topRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
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
                      className="w-full h-full object-cover"
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
                      <div className="flex items-center gap-1">
                        <FaStopwatch className="text-[#A27B5C]" />
                        <span className="text-sm">{recipe.prepTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-[#A27B5C]" />
                        <span className="text-sm">{recipe.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="text-[#A27B5C]" />
                        <span className="text-sm">
                          {recipe.views || recipe.vues}
                        </span>
                      </div>
                    </div>

                    {/* Difficulté */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#DCD7C9] text-sm">
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularRecipes
