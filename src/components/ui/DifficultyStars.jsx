import React from 'react'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

// Composant des Étoiles
const DifficultyStars = ({ difficulty, onChange, interactive = false }) => {
  const starVariants = {
    // Variants pour les étoiles
    initial: { scale: 0, rotate: -180 }, // État initial
    animate: i => ({
      // Animation pour chaque étoile
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: i * 0.1,
      },
    }),
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  }

  // Fonction pour rendre chaque étoile interactive
  const renderStar = niveau => {
    // const StarComponent = interactive ? 'button' : motion.div

    if (interactive) {
      // Si l'interaction est active
      return (
        <button
          key={niveau}
          type="button"
          onClick={() => onChange?.(niveau)}
          className="button-reset relative inline-block"
        >
          <div className="relative inline-block">
            {/* Bordure (étoile extérieure) */}
            <FaStar className="absolute top-0 left-0 w-7 h-7 text-[#1f1e1b]/80" />
            {/* Étoile intérieure */}
            <FaStar
              className={`relative w-6 h-6 ${
                difficulty >= niveau ? 'text-[#e0b14a]' : 'text-[#DCD7C9]'
              }`}
            />
          </div>
        </button>
      )
    }

    return (
      <motion.div // Si l'interaction n'est pas active
        key={niveau}
        variants={starVariants}
        custom={niveau}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className={`text-xs ${
          difficulty >= niveau ? 'text-[#e0b14a] ' : 'text-[#DCD7C9]/80'
        }`}
      >
        <div className="relative inline-block">
          {/* Bordure (étoile extérieure) */}
          <FaStar className="absolute top-0 left-0 w-7 h-7 text-[#1f1e1b]/80" />
          {/* Étoile intérieure */}
          <FaStar
            className={`relative w-6 h-6 ${
              difficulty >= niveau ? 'text-[#e0b14a]' : 'text-[#DCD7C9]'
            }`}
          />
        </div>
      </motion.div>
    )
  }

  return (
    // Affichage des Étoiles
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(
        (
          niveau // map() pour afficher chaque Étoile
        ) => (
          <div key={niveau} className="bg-transparent">
            {renderStar(niveau)}
          </div>
        )
      )}
    </div>
  )
}

export default DifficultyStars
