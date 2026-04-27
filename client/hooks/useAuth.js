import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const API_URL=import.meta.env.VITE_API_URL

    useEffect(() => {

      const verify = async () => {
        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return
        }


        try {
            const res = await fetch(`${API_URL}/verify-token`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            if(res.ok) {
                setIsAuthenticated(!!token)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
        
      }

      verify()
      
    }, [])

    const login = (token) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }
    
    return { isAuthenticated, loading, login, logout }
}