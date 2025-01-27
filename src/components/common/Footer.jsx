import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import HomeButton from '../buttons/HomeButton'
import DashboardButton from '../buttons/Dashboard'

// ouvrire un lien au clique sur le mail
const openMail = 'contact@letscook.fr'

const Footer = () => {
  return (
    <footer className="card-container text-white py-8 mt-6 shadow-[#4A403A] shadow-4xl ">
      <section className="container mx-auto px-4 ">
        <article className="grid grid-cols-1 md:grid-cols-3 gap-8 flex justify-between align-items-center">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-4">Let's Cook</h3>
            <p>Découvrez les meilleures recettes de cuisine</p>
          </div>
          <div>
            <ul className="space-y-2 items-center  flex justify-between ">
              <li>
                <HomeButton className="btn-site" />
              </li>
              <li>
                <DashboardButton className="btn-site" />
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <a
              href={`mailto:${openMail}`}
              className="btn-site"
              aria-label="Envoyer un email"
            >
              {openMail}
            </a>
          </div>
        </article>
        <div className="mt-8 pt-8 border-t border-[#A27B5C] text-center">
          <p>
            &copy; {new Date().getFullYear()} Let's Cook. Tous droits réservés.
          </p>
        </div>
      </section>
    </footer>
  )
}

export default Footer
