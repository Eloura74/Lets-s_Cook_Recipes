import React from 'react'
import BackButton from '../components/buttons/BackButton'

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <BackButton />
      </div>
      
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Recettes totales</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Recettes populaires</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Nouvelles recettes</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
      </div>

      {/* Graphiques et analyses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Popularité par catégorie</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Graphique à venir
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Tendances mensuelles</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Graphique à venir
          </div>
        </div>
      </div>

      {/* Liste des dernières recettes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Dernières recettes ajoutées</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Titre</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Vues</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Exemple de recette</td>
                <td className="py-2">22/01/2025</td>
                <td className="py-2">0</td>
                <td className="py-2">
                  <button className="btn-secondary">Voir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
