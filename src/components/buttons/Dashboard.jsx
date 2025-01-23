import React from 'react'
import { Link } from 'react-router-dom'
import { FaChartBar } from 'react-icons/fa'

const DashboardButton = () => {
  return (
    <Link
      to="/dashboard"
      className="justify-center bg-white text-gray-800 px-6 py-2 rounded-full min-w-32 hover:bg-gray-100 transition-colors font-memoirs text-lg flex items-center gap-2 shadow-md shadow-gray-500"
    >
      <FaChartBar className="w-5 h-5" />
      <span>Tableau de bord</span>
    </Link>
  )
}

export default DashboardButton
