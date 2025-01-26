import React from 'react'
import { Link } from 'react-router-dom'
import { FaChartBar } from 'react-icons/fa'

const DashboardButton = ({ className = '' }) => {
  return (
    <Link
      to="/DashboardPage"
      className={`btn-site ${className} flex items-center gap-2`}
    >
      <FaChartBar className="w-5 h-5" />
      <span>Tableau de bord</span>
    </Link>
  )
}

export default DashboardButton
