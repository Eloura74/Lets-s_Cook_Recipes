import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'
import HomeButton from '../buttons/HomeButton'

import DashboardButton from '../buttons/Dashboard'
import { useAuth } from '../../contexts/AuthContext'
import { FaBars, FaTimes, FaUser, FaUserPlus } from 'react-icons/fa'
import PopularRecipes from './PopularRecipes'
import recipesData from '../../data/recettes.json'

const Header = () => {
  const { user, logout } = useAuth()
  const [menuOuvert, setMenuOuvert] = useState(false)

  const toggleMenu = () => setMenuOuvert(!menuOuvert)

  return (
    <header className="bg-white w-full ">
      {/* Styles de base pour les animations de la bannière */}
      <style>
        {`
          @keyframes pulse-scale {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.5), 0 0 10px rgba(239, 68, 68, 0.3); }
            50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.5); }
            100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.5), 0 0 10px rgba(239, 68, 68, 0.3); }
          }
          .badge-gratuit {
            animation: pulse-scale 2s ease-in-out infinite, glow 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* Bannière promotionnelle */}
      <section
        className="bg-gradient-to-r from-[#2C3639] via-[#2C3639] to-[#2C3639] shadow-lg"
        aria-label="Bannière promotionnelle"
      >
        {/* Container pour le texte de la bannière */}
        <article className="container mx-auto">
          <p className="py-2 px-4 md:px-6 font-memoirs text-sm sm:text-base md:text-lg flex flex-wrap items-center justify-center gap-2 text-[#DCD7C9]">
            {user ? (
              <>
                <span>Bienvenue</span>
                <strong className="text-lg sm:text-xl md:text-2xl font-bold text-[#A27B5C] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
                  {/* Nom de l'utilisateur connecté */}
                  {user.name}
                  {' ! '}
                </strong>
                <span className="hidden sm:inline mx-2" aria-hidden="true">
                  •
                </span>
                <span className="relative group cursor-pointer text-center">
                  <span className="whitespace-normal sm:whitespace-nowrap">
                    Abonnez vous à notre newsletter et recevez notre livre de
                    recettes
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#A27B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </span>
                <span className="badge-gratuit ml-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-2 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer">
                  GRATUIT !
                </span>
              </>
            ) : (
              // Texte pour les utilisateurs non connectés
              <>
                <span>Bienvenue sur Let's Cook</span>
                <span className="hidden sm:inline mx-2" aria-hidden="true">
                  •
                </span>
                <span className="relative group cursor-pointer text-center">
                  <span className="whitespace-normal sm:whitespace-nowrap">
                    Abonnez vous à notre newsletter et recevez notre livre de
                    recettes
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#A27B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </span>
                <span className="badge-gratuit ml-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-2 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer">
                  GRATUIT !
                </span>
              </>
            )}
          </p>
        </article>
      </section>
      {/* ______________________________________________________________________________________________________________ */}
      {/* Navigation principale */}
      <nav className="background-principale" aria-label="Navigation principale">
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 
          
         "
        >
          {/* Logo et navigation */}
          <div className="flex space-x-4   ">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 logo-link">
              <img
                src="/images/2-1logo.png"
                alt="Logo Let's Cook"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain mix-blend-screen brightness-200 "
              />
            </Link>

            {/* Bouton menu mobile burger */}
            <button
              onClick={toggleMenu}
              className="  md:hidden p-2 rounded-lg text-[#DCD7C9] hover:bg-[#3F4E4F]/50 transition-colors"
              aria-expanded={menuOuvert}
              aria-label="Menu principal"
            >
              {menuOuvert ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Navigation desktop */}
            <div className="hidden md:flex pl-20 items-center justify-start space-x-4 lg:space-x-8">
              {/* Boutton accueil */}
              <HomeButton className="nav-btn" />
              <div className="flex items-center space-x-6">
                {user && <DashboardButton className="btn-site" />}
                {user ? ( // Si l'utilisateur est connecté affiche le bouton deconnexion
                  <button onClick={logout} className="btn-site">
                    Déconnexion
                  </button>
                ) : (
                  // Sinon affiche le bouton d'inscription et de connexion
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="btn-site flex items-center gap-2"
                    >
                      <FaUser className="max-w-5 max-h-5" />
                      <span className="mx-auto pr-4 text-2xl">Connexion</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-site flex items-center gap-2"
                    >
                      <FaUserPlus className="max-w-5 max-h-5" />
                      <span className="mx-auto pr-4 text-2xl">Inscription</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ______________________________________________________________________________________________________________ */}
          {/* Menu mobile */}
          <div
            className={`md:hidden transition-all  duration-300 ${
              menuOuvert ? ' max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="pt-4 pb-3 space-y-3">
              <HomeButton className="block w-full text-left nav-btn" />
              {/* <RecipesButton className="block w-full text-left nav-btn" /> */}
              {user && (
                <DashboardButton className="block w-full text-left btn-site" />
              )}
              {user ? (
                <button
                  onClick={logout}
                  className="block w-full text-left btn-site"
                >
                  Déconnexion
                </button>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" className="block w-full text-left btn-site">
                    Connexion
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-left btn-site"
                  >
                    Inscription
                  </Link>
                </div>
              )}

              <div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2C3639] to-transparent"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>

        {/* ______________________________________________________________________________________________________________ */}
        {/* Section Hero avec titre et barre de recherche */}

        <section
          className="relative min-h-[40vh] flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            rgba(44,54,57,0.1) 85%,
            rgba(44,54,57,0.95) 100%
          ),
          linear-gradient(
            to left,
            rgba(255,255,255,0.5) 0%,
            rgba(255,255,255,0.00) 40%, 
            rgba(0,0,0,0.99) 100%
          ),
          url("/images/header2.png")
          `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Effet de fondu en haut */}
          <div
            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#2C3639] to-transparent"
            aria-hidden="true"
          ></div>
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div
            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#2C3639] to-transparent"
            aria-hidden="true"
          ></div>
          {/* Contenu */}
          <article className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Titre */}

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-memoirs text-[#DCD7C9] mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9),_0_0_30px_rgba(220,215,201,0.4)]">
              Bienvenue sur Let's Cook
            </h1>

            {/* Sous titre */}
            <p className="text-xl sm:text-2xl md:text-3xl text-content mb-8 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
              Découvrez nos meilleures recettes de cuisine
            </p>

            {/* Barre de recherche */}
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </article>

          {/* Effet de dégradé en bas */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2C3639] to-transparent"
            aria-hidden="true"
          />
        </section>
      </nav>
      {/* ______________________________________________________________________________________________________________________ */}
      {/* Section des recettes populaires */}
      <PopularRecipes recipes={recipesData} />
    </header>
  )
}

export default Header
