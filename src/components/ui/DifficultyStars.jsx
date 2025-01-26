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

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          variants={starVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={index}
        >
          <FaStar
            className={`text-lg transition-all duration-300 ease-in-out 
              ${
                index < difficulty
                  ? 'text-yellow-700 brightness-110 drop-shadow-[0_0_4px_rgba(255,215,0,0.7)] scale-110'
                  : 'text-gray-300 scale-100'
              }`}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default DifficultyStars
