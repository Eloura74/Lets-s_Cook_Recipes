import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook personnalisé pour gérer le scroll automatique vers un élément avec un hash
 */
export const useScrollToHash = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [hash])
}
