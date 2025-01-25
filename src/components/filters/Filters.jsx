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
    difficulte: { actif: false, inverse: false },
  })

  // Configuration des filtres avec leurs textes et fonctions de tri
  const configurationFiltres = {
    date: {
      normal: {
        texte: 'Du plus récent',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => new Date(b.date) - new Date(a.date)),
      },
      inverse: {
        texte: 'Du plus ancien',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => new Date(a.date) - new Date(b.date)),
      },
    },
    popularite: {
      normal: {
        texte: 'Les plus populaires',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => b.likes - a.likes),
      },
      inverse: {
        texte: 'Les moins populaires',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => a.likes - b.likes),
      },
    },
    difficulte: {
      normal: {
        texte: 'Les plus difficiles',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => b.difficulty - a.difficulty),
      },
      inverse: {
        texte: 'Les plus faciles',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => a.difficulty - b.difficulty),
      },
    },
  }

  /**
   * Retourne les classes CSS pour un bouton de filtre
   * @param {string} nomFiltre - Nom du filtre
   * @returns {string} Classes CSS
   */
  const obtenirClassesBouton = nomFiltre => {
    const estActif = etatsDesFiltres[nomFiltre].actif
    return `btn-site relative flex items-center gap-2 px-4 py-2 rounded-full text-[#DCD7C9] transition-all duration-300 
    ${
      estActif
        ? 'bg-[#2C3639] shadow-lg border border-[#A27B5C]/50'
        : 'bg-[#2C3639]/50 hover:bg-[#2C3639]/80 border border-[#DCD7C9]/10'
    }`
  }

  /**
   * Retourne le texte à afficher sur le bouton selon son état
   * @param {string} nomFiltre - Nom du filtre
   * @returns {string} Texte du bouton
   */
  const obtenirTexteBouton = nomFiltre => {
    const etatFiltre = etatsDesFiltres[nomFiltre]
    return etatFiltre.actif
      ? etatFiltre.inverse
        ? configurationFiltres[nomFiltre].inverse.texte
        : configurationFiltres[nomFiltre].normal.texte
      : `Trier par ${nomFiltre}`
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
        difficulte: { actif: false, inverse: false },
      }

      // Si le filtre était déjà actif, inverse son état
      // Sinon, active le filtre en mode inverse
      nouveauxEtats[nomFiltre] = {
        actif: true,
        inverse: etatsActuels[nomFiltre].actif
          ? !etatsActuels[nomFiltre].inverse
          : true,
      }

      return nouveauxEtats
    })

    // Applique le filtre aux recettes
    const etatFiltre = etatsDesFiltres[nomFiltre]
    const mode = etatFiltre.inverse ? 'inverse' : 'normal'
    onFilterChange(configurationFiltres[nomFiltre][mode].trierRecettes)
  }

  /**
   * Réinitialise tous les filtres
   */
  const reinitialiserFiltres = () => {
    setEtatsDesFiltres({
      date: { actif: false, inverse: false },
      popularite: { actif: false, inverse: false },
      difficulte: { actif: false, inverse: false },
    })
    // Retourne les recettes dans leur ordre d'origine
    onFilterChange(recettes => [...recettes])
  }

  // Vérifie si au moins un filtre est actif
  const auMoinsUnFiltreActif = Object.values(etatsDesFiltres).some(
    filtre => filtre.actif
  )

  return (
    <section className="container mx-auto px-6 py-4">
      <div className="flex flex-wrap items-center gap-6">
        <h2 className="text-4xl text-[#DCD7C9] font-memoirs [text-shadow:_0_3px_0_rgba(1_1_1_/_80%)]">
          Filtres :
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {Object.keys(configurationFiltres).map(nomFiltre => {
            const estActif = etatsDesFiltres[nomFiltre].actif
            const estInverse = etatsDesFiltres[nomFiltre].inverse
            return (
              <motion.button
                key={nomFiltre}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => gererClicFiltre(nomFiltre)}
                className={obtenirClassesBouton(nomFiltre)}
              >
                <span className="font-medium">
                  {obtenirTexteBouton(nomFiltre)}
                </span>
                {estActif && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-[#A27B5C] text-white text-xs"
                  >
                    {estInverse ? '↑' : '↓'}
                  </motion.span>
                )}
              </motion.button>
            )
          })}
          {auMoinsUnFiltreActif && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={reinitialiserFiltres}
              className="btn-site px-4 py-2 "
            >
              Tout afficher
            </motion.button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Filtres
