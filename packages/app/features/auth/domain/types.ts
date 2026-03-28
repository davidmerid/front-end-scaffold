export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  token: string | null
}

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthAdapter {
  signIn(email: string, password: string): Promise<AuthUser>
  signOut(): Promise<void>
  getIdToken(): Promise<string | null>
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void
}
