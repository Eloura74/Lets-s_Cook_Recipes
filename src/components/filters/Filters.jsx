import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Composant de filtrage des recettes
 * Permet de trier les recettes selon différents critères :
 * - Date (Plus récent / Plus ancien)
 * - Popularité (Plus populaire / Moins populaire)
 * - Difficulté (Plus difficile / Moins difficile)
 * 
 * @param {Function} onFilterChange - Fonction appelée lors du changement de filtre
 */
const Filtres = ({ onFilterChange }) => {
  // État pour suivre l'état de chaque filtre (actif/inactif et normal/inverse)
  const [etatsDesFiltres, setEtatsDesFiltres] = useState({
    date: { actif: false, inverse: false },
    popularite: { actif: false, inverse: false },
    difficulte: { actif: false, inverse: false }
  })

  // Configuration des filtres avec leurs textes et fonctions de tri
  const configurationFiltres = {
    date: {
      normal: {
        texte: 'Plus récent',
        trierRecettes: recettes => [...recettes].sort((a, b) => new Date(b.date) - new Date(a.date))
      },
      inverse: {
        texte: 'Plus ancien',
        trierRecettes: recettes => [...recettes].sort((a, b) => new Date(a.date) - new Date(b.date))
      }
    },
    popularite: {
      normal: {
        texte: 'Plus populaire',
        trierRecettes: recettes => [...recettes].sort((a, b) => b.likes - a.likes)
      },
      inverse: {
        texte: 'Moins populaire',
        trierRecettes: recettes => [...recettes].sort((a, b) => a.likes - b.likes)
      }
    },
    difficulte: {
      normal: {
        texte: 'Plus difficile',
        trierRecettes: recettes => [...recettes].sort((a, b) => b.difficulty - a.difficulty)
      },
      inverse: {
        texte: 'Moins difficile',
        trierRecettes: recettes => [...recettes].sort((a, b) => a.difficulty - b.difficulty)
      }
    }
  }

  /**
   * Retourne les classes CSS pour un bouton de filtre
   * @param {string} nomFiltre - Nom du filtre
   * @returns {string} Classes CSS
   */
  const obtenirClassesBouton = nomFiltre => {
    const classesDeBase = 'px-4 py-2 rounded-full transition-colors font-memoirs'
    const estActif = etatsDesFiltres[nomFiltre].actif
    
    return `${classesDeBase} ${
      estActif
        ? 'bg-[#9ca3af] text-[#14142B]'
        : 'bg-[#1F1F3D] text-white hover:bg-[#2D2D4D]'
    }`
  }

  /**
   * Gère le clic sur un bouton de filtre
   * @param {string} nomFiltre - Nom du filtre cliqué
   */
  const gererClicFiltre = nomFiltre => {
    // Mise à jour des états des filtres
    setEtatsDesFiltres(etatsActuels => {
      // Réinitialise tous les filtres
      const nouveauxEtats = {
        date: { actif: false, inverse: false },
        popularite: { actif: false, inverse: false },
        difficulte: { actif: false, inverse: false }
      }

      // Si le filtre était déjà actif, inverse son état
      // Sinon, active le filtre en mode inverse
      nouveauxEtats[nomFiltre] = {
        actif: true,
        inverse: etatsActuels[nomFiltre].actif 
          ? !etatsActuels[nomFiltre].inverse 
          : true
      }

      return nouveauxEtats
    })

    // Applique le filtre aux recettes
    const etatFiltre = etatsDesFiltres[nomFiltre]
    const mode = etatFiltre.inverse ? 'inverse' : 'normal'
    onFilterChange(configurationFiltres[nomFiltre][mode].trierRecettes)
  }

  /**
   * Retourne le texte à afficher sur le bouton selon son état
   * @param {string} nomFiltre - Nom du filtre
   * @returns {string} Texte du bouton
   */
  const obtenirTexteBouton = nomFiltre => {
    const etatFiltre = etatsDesFiltres[nomFiltre]
    if (!etatFiltre.actif) {
      return configurationFiltres[nomFiltre].normal.texte
    }
    return etatFiltre.inverse 
      ? configurationFiltres[nomFiltre].inverse.texte 
      : configurationFiltres[nomFiltre].normal.texte
  }

  return (
    <section className="container mx-auto p-6 pl-4 sm:pl-0 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <article className="flex justify-center items-center gap-4 w-full mr-4 sm:w-auto">
          <h2 className="text-xl text-gray-600 mb-1 font-memoirs [text-shadow:_0_1px_0_rgba(1_1_1_/_80%)]">
            Trier par :
          </h2>
          <div className="flex flex-wrap gap-4">
            {Object.keys(configurationFiltres).map(nomFiltre => (
              <motion.button
                key={nomFiltre}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => gererClicFiltre(nomFiltre)}
                className={obtenirClassesBouton(nomFiltre)}
              >
                {obtenirTexteBouton(nomFiltre)}
              </motion.button>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default Filtres
