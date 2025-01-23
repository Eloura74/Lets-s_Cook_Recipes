import React from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/buttons/BackButton'

const DetailPage = () => {
  const { id } = useParams()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>
      
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          {/* Image de la recette */}
        </div>
        
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Titre de la recette</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <span className="flex items-center">
                <span className="mr-2">⏱️</span>
                Temps de préparation: 30 min
              </span>
              <span className="flex items-center">
                <span className="mr-2">📊</span>
                Difficulté: Moyenne
              </span>
              <span className="flex items-center">
                <span className="mr-2">👥</span>
                Pour 4 personnes
              </span>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Ingrédients</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Ingrédient 1</li>
              <li>Ingrédient 2</li>
              <li>Ingrédient 3</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li>Étape 1 de la recette...</li>
              <li>Étape 2 de la recette...</li>
              <li>Étape 3 de la recette...</li>
            </ol>
          </section>
        </div>
      </article>
    </div>
  )
}

export default DetailPage
