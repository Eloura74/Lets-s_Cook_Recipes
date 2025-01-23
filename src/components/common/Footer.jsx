import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      {/* <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Let's Cook</h3>
            <p>Découvrez les meilleures recettes de cuisine</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Accueil</Link></li>
              <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>Email: contact@letscook.fr</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Let's Cook. Tous droits réservés.</p>
        </div>
      </div> */}
    </footer>
  )
}

export default Footer
