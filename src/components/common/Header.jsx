// import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'
import HomeButton from '../buttons/HomeButton'
import RecipesButton from '../buttons/RecipesButton'
import DashboardButton from '../buttons/Dashboard'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white w-full">
      {/* Bannière supérieure PROMO*/}
      <div className="bg-black bg-opacity-20 text-center py-1 text-sm text-gray-600">
        <p className="font-memoirs px-4 text-lg">
          {user ? (
            <>
              Bienvenue{' '}
              <span className="text-2xl font-bold mr-2">{user.name}</span>,
              Commander notre livre de recette
            </>
          ) : (
            "Bienvenue sur Let's Cook- Commander notre livre de recette"
          )}
          <span
            className="text-2xl text-red-500 ml-2 cursor-pointer hover:underline"
            onClick={e => e.preventDefault()}
          >
            gratuit{' '}
          </span>
          !
        </p>
      </div>
      {/* <div className="flex justify-start">
        <Link to="/" className="flex items-center">
          <img
            src="/images/2logo.png"
            alt="Let's Cook"
            className="absolute z-10 mx-14 mt-72 h-20 sm:h-24 md:h-32 lg:h-40 -rotate-30 w-auto filter grayscale-0 brightness-125 contrast-100 hue-rotate-180"
            style={{
              WebkitMaskImage:
                'radial-gradient(circle, rgba(0, 0, 0, 1) 55%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'cover',
            }}
          />
        </Link>
      </div> */}
      {/* Banniere Navigation */}
      <div className="custom-background px-2 sm:px-4 md:px-8 lg:px-20 relative pt-8 md:pt-12 lg:pt-4">
        <nav className="container mx-auto relative">
          <article className="flex flex-col pb-4 md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            {/* Section gauche : Logo et navigation principale */}
            <div className="flex  flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12  border-none ">
              <Link to="/" className="logo-link flex items-center relative">
                <img
                  src="/images/2-1logo.png"
                  alt="Logo Let's Cook"
                  className="h-20 w-auto object-contain mix-blend-screen shadow-md -rotate-19"
                />
              </Link>

              {/* Navigation principale */}
              <nav className="flex mb-4 space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 mt-2 md:mt-0">
                <HomeButton className="nav-btn" />
                <RecipesButton className="nav-btn" />
              </nav>
            </div>

            {/* Section droite : Actions utilisateur */}
            <article className="flex flex-col items-center md:items-end gap-4 md:gap-6">
              <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4 mt-2 md:mt-0">
                {user && <DashboardButton className="btn-site" />}
                {user ? (
                  <button onClick={logout} className="btn-site">
                    Déconnexion
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <Link to="/login" className="btn-site">
                      Connexion
                    </Link>
                    <Link to="/signup" className="btn-site">
                      Inscription
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </article>
        </nav>
      </div>

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
    </header>
  )
}

export default Header
