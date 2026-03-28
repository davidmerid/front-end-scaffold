import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { AuthUser, AuthState, AuthAdapter } from '../domain/types'

export interface AuthContextValue {
  user: AuthUser | null
  authState: AuthState
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({
  children,
  adapter,
}: {
  children: ReactNode
  adapter: AuthAdapter
}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authState, setAuthState] = useState<AuthState>('loading')

  useEffect(() => {
    const unsubscribe = adapter.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setAuthState('authenticated')
      } else {
        setUser(null)
        setAuthState('unauthenticated')
      }
    })
    return unsubscribe
  }, [adapter])

  const signIn = useCallback(
    async (email: string, password: string) => {
      const authUser = await adapter.signIn(email, password)
      setUser(authUser)
      setAuthState('authenticated')
    },
    [adapter]
  )

  const signOut = useCallback(async () => {
    await adapter.signOut()
    setUser(null)
    setAuthState('unauthenticated')
  }, [adapter])

  const getIdToken = useCallback(async () => {
    return adapter.getIdToken()
  }, [adapter])

  return (
    <AuthContext.Provider
      value={{
        user,
        authState,
        isLoading: authState === 'loading',
        isAuthenticated: authState === 'authenticated',
        signIn,
        signOut,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
