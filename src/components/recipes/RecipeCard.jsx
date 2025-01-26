import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaClock } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col bg-linear-to-br from-[#2C3639]/90 to-[#3F4E4F] rounded-2xl border border-white/10 shadow-xl group transition-all duration-300"
      style={{
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      {/* Image et métadonnées */}
      <figure className="relative h-40 sm:h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-10"
          aria-hidden="true"
        />
        <img
          src={recipe.imageUrl}
          alt={`Présentation de ${recipe.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </figure>

      {/* Contenu */}
      <div className="flex flex-col flex-grow p-4">
        {/* Statistiques */}
        <aside className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 sm:gap-2">
          {/* Likes */}
          <div
            className="flex items-center gap-1.5 bg-[#2C3639]/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20"
            aria-label={`${recipe.likes} likes`}
          >
            <FaHeart
              className="text-red-400 drop-shadow-sm text-xs sm:text-sm"
              aria-hidden="true"
            />
            <span className="text-[#DCD7C9] text-xs sm:text-sm font-medium">
              {recipe.likes}
            </span>
          </div>

          {/* Vues */}
          <div
            className="flex items-center gap-1.5 bg-[#2C3639]/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20"
            aria-label={`${recipe.views} vues`}
          >
            <FaEye
              className="text-blue-400 drop-shadow-sm text-xs sm:text-sm"
              aria-hidden="true"
            />
            <span className="text-[#DCD7C9] text-xs sm:text-sm font-medium">
              {recipe.views}
            </span>
          </div>
        </aside>

        {/* Titre */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#DCD7C9] mb-2 line-clamp-2 group-hover:text-white transition-colors duration-200">
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#DCD7C9]/80 mb-4 line-clamp-2 group-hover:text-[#DCD7C9]/90 transition-colors duration-200 flex-grow">
          {recipe.description}
        </p>

        {/* Pied de carte */}
        <footer className="flex items-center justify-between mt-auto pt-2 border-t border-[#DCD7C9]/10">
          {/* Temps de préparation */}
          <div
            className="flex items-center gap-1 sm:gap-2 text-[#DCD7C9]/70"
            aria-label={`Temps de préparation : ${recipe.prepTime} minutes`}
          >
            <FaClock className="text-xs sm:text-sm" aria-hidden="true" />
            <span className="text-xs sm:text-sm">{recipe.prepTime} min</span>
          </div>

          {/* Lien vers la recette */}
          <Link
            to={`/recette/${recipe.id}`}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm btn-site hover:scale-105 transition-transform duration-300"
          >
            Voir la recette
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default RecipeCard;
