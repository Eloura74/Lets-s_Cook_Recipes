import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn-secondary flex items-center space-x-2"
    >
      <span>←</span>
      <span>Retour</span>
    </button>
  )
}

export default BackButton
