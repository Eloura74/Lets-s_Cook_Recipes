import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { createPortal } from 'react-dom'

const Filtres = ({ onFilterChange }) => {
  const [etatsDesFiltres, setEtatsDesFiltres] = useState({
    date: { actif: false, inverse: false },
    popularite: { actif: false, inverse: false },
    difficulte: { actif: false, inverse: false },
  })

  // État pour le menu mobile
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)

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
          [...recettes].sort((a, b) => (parseInt(b.likes) || 0) - (parseInt(a.likes) || 0)),
      },
      inverse: {
        texte: 'Les moins populaires',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => (parseInt(a.likes) || 0) - (parseInt(b.likes) || 0)),
      },
    },
    difficulte: {
      normal: {
        texte: 'Les plus difficiles',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => (parseInt(b.difficulty) || 0) - (parseInt(a.difficulty) || 0)),
      },
      inverse: {
        texte: 'Les plus faciles',
        trierRecettes: recettes =>
          [...recettes].sort((a, b) => (parseInt(a.difficulty) || 0) - (parseInt(b.difficulty) || 0)),
      },
    },
  }

  const obtenirClassesBouton = nomFiltre => {
    const estActif = etatsDesFiltres[nomFiltre].actif
    return `btn-site relative flex items-center gap-2 px-4 py-2 rounded-full text-[#DCD7C9] transition-all duration-300 
    ${
      estActif
        ? 'bg-[#2C3639] shadow-lg border border-[#A27B5C]/50'
        : 'bg-[#2C3639]/50 hover:bg-[#2C3639]/80 border border-[#DCD7C9]/10'
    }`
  }

  const obtenirTexteBouton = nomFiltre => {
    const etatFiltre = etatsDesFiltres[nomFiltre]
    return etatFiltre.actif
      ? etatFiltre.inverse
        ? configurationFiltres[nomFiltre].inverse.texte
        : configurationFiltres[nomFiltre].normal.texte
      : `Trier par ${nomFiltre}`
  }

  const gererClicFiltre = nomFiltre => {
    setEtatsDesFiltres(etatsActuels => {
      const nouveauxEtats = {
        date: { actif: false, inverse: false },
        popularite: { actif: false, inverse: false },
        difficulte: { actif: false, inverse: false },
      }

      nouveauxEtats[nomFiltre] = {
        actif: true,
        inverse: etatsActuels[nomFiltre].actif
          ? !etatsActuels[nomFiltre].inverse
          : false,
      }

      const fonctionTri = nouveauxEtats[nomFiltre].inverse
        ? configurationFiltres[nomFiltre].inverse.trierRecettes
        : configurationFiltres[nomFiltre].normal.trierRecettes

      onFilterChange(fonctionTri)

      return nouveauxEtats
    })
  }

  // Animation pour le menu mobile
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  }

  // Composant du menu mobile
  const MenuMobile = () => {
    if (!menuMobileOuvert) return null

    return createPortal(
      <div className="fixed inset-0 bg-black/50 z-[99999] lg:hidden">
        <motion.div
          className="fixed top-[4rem] inset-x-4 flex flex-col gap-4 bg-[#2C3639]/95 p-4 rounded-lg shadow-lg"
          initial="closed"
          animate="open"
          variants={menuVariants}
        >
          <div className="flex flex-col gap-4">
            {Object.keys(configurationFiltres).map(nomFiltre => (
              <button
                key={nomFiltre}
                onClick={() => {
                  gererClicFiltre(nomFiltre)
                  setMenuMobileOuvert(false)
                }}
                className={obtenirClassesBouton(nomFiltre)}
              >
                <span className="font-medium">
                  {obtenirTexteBouton(nomFiltre)}
                </span>
                {etatsDesFiltres[nomFiltre].actif && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-center w-5 h-5 rounded-full bg-[#A27B5C] text-white text-xs"
                  >
                    {etatsDesFiltres[nomFiltre].inverse ? '↑' : '↓'}
                  </motion.span>
                )}
              </button>
            ))}
            {Object.values(etatsDesFiltres).some(filtre => filtre.actif) && (
              <button
                onClick={() => {
                  setEtatsDesFiltres({
                    date: { actif: false, inverse: false },
                    popularite: { actif: false, inverse: false },
                    difficulte: { actif: false, inverse: false },
                  })
                  onFilterChange(recettes => [...recettes])
                  setMenuMobileOuvert(false)
                }}
                className="btn-site px-4 py-2"
              >
                Tout afficher
              </button>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setMenuMobileOuvert(false)}
              className="rounded-full p-2 bg-[#A27B5C] hover:bg-[#A27B5C]/80 transition-colors"
              aria-label="Fermer le menu des filtres"
            >
              <FaTimes className="w-6 h-6 text-[#DCD7C9]" />
            </button>
          </div>
        </motion.div>
      </div>,
      document.body
    )
  }

  return (
    <section className="container mx-auto px-6 py-4">
      <div className="flex flex-wrap items-center gap-6">
        <h2 className="flex text-4xl pb2 text-[#DCD7C9] font-memoirs underline [text-shadow:_0_3px_0_rgba(1_1_1_/_80%)]">
          Choisissez un filtre :
        </h2>

        {/* Version Mobile */}
        <div className="lg:hidden w-full">
          <button
            className="btn-site flex items-center gap-2 mb-4"
            onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
            aria-label={
              menuMobileOuvert ? 'Fermer les filtres' : 'Ouvrir les filtres'
            }
          >
            {menuMobileOuvert ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
            <span>Filtres</span>
          </button>

          <MenuMobile />
        </div>

        {/* Version Desktop */}
        <div className="hidden lg:flex flex-wrap items-center gap-3">
          {Object.keys(configurationFiltres).map(nomFiltre => (
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
              {etatsDesFiltres[nomFiltre].actif && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-center w-5 h-5 rounded-full bg-[#A27B5C] text-white text-xs"
                >
                  {etatsDesFiltres[nomFiltre].inverse ? '↑' : '↓'}
                </motion.span>
              )}
            </motion.button>
          ))}
          {Object.values(etatsDesFiltres).some(filtre => filtre.actif) && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEtatsDesFiltres({
                  date: { actif: false, inverse: false },
                  popularite: { actif: false, inverse: false },
                  difficulte: { actif: false, inverse: false },
                })
                onFilterChange(recettes => [...recettes])
              }}
              className="btn-site px-4 py-2"
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
