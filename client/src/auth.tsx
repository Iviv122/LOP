import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

interface LoginResponse {
  valid: boolean
  user: User
  token: string
}

const AuthContext = createContext<AuthState | undefined>(undefined)

const LOGIN_CHECK_URL = 'http://localhost:8000/api/token_check'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch(LOGIN_CHECK_URL, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const data: LoginResponse = await response.json()

          if (data.valid && response.ok) {
            setUser(data.user)
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem('token')
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('token')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(LOGIN_CHECK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const data: LoginResponse = await response.json()

      if (!data.token) {
        throw new Error('No token received')
      }

      setUser(data.user)
      setIsAuthenticated(true)
      localStorage.setItem('auth-token', data.token)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}