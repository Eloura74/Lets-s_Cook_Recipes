import React from 'react'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const DifficultyStars = ({ difficulty, onChange, interactive = false }) => {
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
      scale: 1.1,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  }

  const renderStar = niveau => {
    const StarComponent = interactive ? 'button' : motion.div
    const props = {
      key: niveau,
      ...(interactive
        ? {
            type: 'button',
            onClick: () => onChange?.(niveau),
            className: `p-0.5 w-6h-6 ${
              difficulty >= niveau ? 'text-[#A27B5C]' : 'text-[#DCD7C9]/30'
            }`,
          }
        : {
            variants: starVariants,
            custom: niveau,
            initial: 'initial',
            animate: 'animate',
            whileHover: 'hover',
            className: `text-xs ${
              difficulty >= niveau ? 'text-[#A27B5C]' : 'text-[#DCD7C9]/30'
            }`,
          }),
    }

    return (
      <StarComponent {...props}>
        <FaStar className="w-2 h-2" />
      </StarComponent>
    )
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  )
}

export default DifficultyStars
