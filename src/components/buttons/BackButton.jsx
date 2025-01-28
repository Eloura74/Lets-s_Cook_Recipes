import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn-site flex items-center gap-2 font-memoirs"
    >
      <FaArrowLeft className="max-w-5 max-h-5" />
      <span className="mx-auto pr-4 text-2xl">Retour</span>
    </button>
  )
}

export default BackButton
