import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usersData from '../data/users.json'

export const useAuthentication = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // Fonction de connexion
    const login = (username, password) => {
        const foundUser = usersData.users.find(
            u => u.username === username && u.password === password
        )
        if (foundUser) {
            setUser(foundUser)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', username)
            navigate('/dashboard')
            return true
        } else {
            alert("Nom d'utilisateur ou mot de passe incorrect")
            return false
        }
    }

    // Fonction de déconnexion
    const logout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')
        setUser(null)
        navigate('/')
    }

    // Vérifier la connexion au chargement
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        const username = localStorage.getItem('username')
        
        if (isLoggedIn && username) {
            const foundUser = usersData.users.find(u => u.username === username)
            if (foundUser) {
                setUser(foundUser)
            }
        }
    }, [])

    return {
        user,
        login,
        logout
    }
}
