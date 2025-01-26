import React from 'react'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const DifficultyStars = ({ difficulty }) => {
  // Animation pour chaque étoile
  const starVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: i => ({
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
      scale: 1.2,
      rotate: 15,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  }

  // Couleurs pour le dégradé des étoiles selon la difficulté
  const starColors = {
    1: 'text-[#7A9E9F]', // Bleu-vert clair
    2: 'text-[#6B8E8F]', // Bleu-vert moyen
    3: 'text-[#5C7E7F]', // Bleu-vert foncé
    4: 'text-[#4D6E6F]', // Bleu-vert très foncé
    5: 'text-[#3E5E5F]', // Bleu-vert le plus foncé
  }

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={starVariants}
        >
          <FaStar
            className={`text-xl ${
              // Couleur de l'icoône en fonction de la difficulté
              index < difficulty
                ? 'text-gray-300' // Couleur pour les étoiles inactives
                : starColors[difficulty] // Couleur pour les étoiles actives
            } drop-shadow-[0_0_2px_rgba(0,0,0,0.3)]`}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default DifficultyStars
