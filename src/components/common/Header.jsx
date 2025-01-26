import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'
import HomeButton from '../buttons/HomeButton'
import RecipesButton from '../buttons/RecipesButton'
import DashboardButton from '../buttons/Dashboard'
import { useAuth } from '../../contexts/AuthContext'
import PopularRecipes from './PopularRecipes'
import recipesData from '../../data/recettes.json'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white w-full">
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
        <div className="container mx-auto">
          <p className="py-2 px-6 font-memoirs text-lg flex items-center justify-center gap-2 text-[#DCD7C9]">
            {user ? (
              <>
                <span className="text-lg">Bienvenue</span>{' '}
                <strong className="text-2xl font-bold text-[#A27B5C] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
                  {user.name}
                </strong>
                <span className="mx-2" aria-hidden="true">
                  •
                </span>
                <span className="relative group cursor-pointer">
                  <span className="whitespace-nowrap">
                    Commander notre livre de recettes
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#A27B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </span>
                <span className="badge-gratuit ml-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-0.5 rounded-full text-sm font-bold transform hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-lg">
                  GRATUIT !
                </span>
              </>
            ) : (
              <>
                <span>Bienvenue sur Let's Cook</span>
                <span className="mx-2" aria-hidden="true">
                  •
                </span>
                <span className="relative group cursor-pointer">
                  <span className="whitespace-nowrap">
                    Commander notre livre de recettes
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#A27B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </span>
                <span className="badge-gratuit ml-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-0.5 rounded-full text-sm font-bold transform hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-lg">
                  GRATUIT !
                </span>
              </>
            )}
          </p>
        </div>
      </section>

      {/* Navigation principale */}
      <nav
        className="custom-background px-2 sm:px-4 md:px-8 lg:px-20 relative pt-8 md:pt-12 lg:pt-4"
        aria-label="Navigation principale"
      >
        <div className="container mx-auto relative">
          <div className="flex flex-col pb-4 md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            {/* Logo et navigation primaire */}
            <section
              className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12 border-none"
              aria-label="Navigation primaire"
            >
              <Link to="/" className="logo-link flex items-center relative">
                <img
                  src="/images/2-1logo.png"
                  alt="Logo Let's Cook"
                  className="h-20 w-auto object-contain mix-blend-screen shadow-md -rotate-19"
                />
              </Link>

              <div className="flex mb-4 space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 mt-2 md:mt-0">
                <HomeButton className="nav-btn" />
                <RecipesButton className="nav-btn" />
              </div>
            </section>

            {/* Actions utilisateur */}
            <section
              className="flex flex-col items-center md:items-end gap-4 md:gap-6"
              aria-label="Actions utilisateur"
            >
              <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4 mt-2 md:mt-0">
                {user && <DashboardButton className="btn-site" />}
                {user ? (
                  <button onClick={logout} className="btn-site">
                    Déconnexion
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login" className="btn-site">
                      Connexion
                    </Link>
                    <Link to="/signup" className="btn-site">
                      Inscription
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </nav>

      {/* En-tête principal */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-4 md:py-6 lg:py-8 h-64 md:h-80 lg:h-96"
        style={{
          backgroundImage: "url('/images/header2.png')",
          backgroundSize: 'cover',
        }}
      >
        {/* Voile dégradé */}
        {
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent"></div>
        }
        {/* <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-amber-600/30 to-transparent"></div> */}

        <article className="container mx-auto text-center mt-30 relative z-10">
          <h1 className="text-6xl font-memoirs text-[#DCD7C9] mb-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9),_0_0_20px_rgba(220,215,201,0.3)]">
            Bienvenue sur Let's Cook
          </h1>
          <p className="text-xl text-[#DCD7C9]/90 mb-8 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
            Découvrez nos meilleures recettes de cuisine
          </p>
        </article>

        <div className="flex justify-center mt-4 pl-24 md:mt-10 relative z-10">
          <SearchBar />
        </div>
      </section>

      {/* Section des recettes populaires */}
      <PopularRecipes recipes={recipesData} />
    </header>
  )
}

export default Header
