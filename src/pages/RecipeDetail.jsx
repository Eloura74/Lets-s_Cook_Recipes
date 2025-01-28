import React, { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useRecipes } from '../contexts/RecipesContext'
import DifficultyStars from '../components/ui/DifficultyStars'
import { FaHeart, FaEye, FaClock } from 'react-icons/fa'
import Footer from '../components/common/Footer'

const RecipeDetail = () => {
  const { id } = useParams()
  const { recipes, incrementViews, loading } = useRecipes()
  const recipe = recipes.find(search => search.id === id)
  const viewIncremented = useRef(false)
  const detailRef = useRef(null)

  useEffect(() => {
    if (recipe && !viewIncremented.current) {
      incrementViews(recipe.id)
      viewIncremented.current = true
    }
  }, [recipe, incrementViews])

  useEffect(() => {
    if (detailRef.current) {
      const yOffset = -80 
      const element = detailRef.current
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
  }, [recipe]) 

  if (loading) {
    return (
      <div className="container-base">
        <div className="max-w-4xl mx-auto card-container p-8 text-center">
          <h2 className="title-secondary mb-4">Chargement de la recette...</h2>
          <div className="w-16 h-16 border-4 border-[#A27B5C] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container-base">
        <div className="max-w-4xl mx-auto card-container p-8 text-center">
          <h1 className="title-primary mb-6">Recette non trouvée</h1>
          <p className="text-content mb-6">
            Désolé, la recette que vous recherchez n'existe pas ou n'est plus
            disponible.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Retour à l'accueil
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <main className="container p-6 ">
      <div ref={detailRef} className="max-w-4xl mx-auto card-container shadow-[#4A403A] shadow-4xl">
        {/*_______________________________________________________________________ En-tête avec image */}
        <header className="relative h-96">
          <img src={recipe.imageUrl} alt={recipe.title} className="img-cover" />
          <div className="gradient-overlay" />
          <section className="absolute bottom-0 left-0 p-6">
            <h1 className="title-primary text-[#DCD7C9] shadow-text shadow-[#4A403A]/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {recipe.title}
            </h1>

            <article className="flex-start flex-wrap bg-[#2C3639]/60 backdrop-blur-sm rounded-lg p-2">
              {/* ______________________________________________________________________ Likes */}
              <div className="icon-container text-[#DCD7C9]">
                <FaHeart className="text-red-500 drop-shadow-md" />
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {recipe.likes}
                </span>
              </div>
              {/* ________________________________________________________________________  Vues    */}
              <div className="icon-container text-[#DCD7C9]">
                <FaEye className="text-blue-400 drop-shadow-md" />
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {recipe.views}
                </span>
              </div>
              <div className="icon-container text-[#DCD7C9]">
                <FaClock className="text-green-400 drop-shadow-md" />
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {recipe.prepTime} min
                </span>
              </div>
              <DifficultyStars difficulty={recipe.difficulty} />
            </article>
          </section>
        </header>
        {/* ______________________________________________________________________ */}
        {/* Contenu */}
        <article className="section-card">
          {/* Description */}
          <div>
            <h2 className="flex justify-center title-secondary border-t border-[#A27B5C] pt-4 shadow-[0_-6px_10px_-8px_rgba(0,0,0,0.7)] sm:text-center text-linear-gradient bg-clip-text">
              Description
            </h2>
            <p className="text-content indent-8">{recipe.description}</p>
          </div>

          {/* Ingrédients */}
          <div>
            <h2 className="flex justify-center title-secondary border-t border-[#A27B5C] pt-4 shadow-[0_-6px_10px_-8px_rgba(0,0,0,0.7)] sm:text-center text-linear-gradient bg-clip-text">
              Ingrédients
            </h2>
            <ul className="list-discs indent-8">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-content">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="flex justify-center title-secondary border-t border-[#A27B5C] pt-4 shadow-[0_-6px_10px_-8px_rgba(0,0,0,0.7)] sm:text-center text-linear-gradient bg-clip-text">
              Instructions
            </h2>
            <ol className="list-numbered indent-8">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-content">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </article>

        {/* Bouton retour */}
        <div className="section-divider flex-center">
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default RecipeDetail
