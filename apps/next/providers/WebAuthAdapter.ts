import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { getFirebaseAuth } from '../lib/firebase'
import type { AuthAdapter, AuthUser } from '@scaffold/app/features/auth/domain/types'

function toAuthUser(firebaseUser: import('firebase/auth').User): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    token: null,
  }
}

export const webAuthAdapter: AuthAdapter = {
  async signIn(email: string, password: string): Promise<AuthUser> {
    const auth = getFirebaseAuth()
    const result = await signInWithEmailAndPassword(auth, email, password)
    return toAuthUser(result.user)
  },

  async signOut(): Promise<void> {
    const auth = getFirebaseAuth()
    await firebaseSignOut(auth)
  },

  async getIdToken(): Promise<string | null> {
    const auth = getFirebaseAuth()
    const user = auth.currentUser
    if (!user) return null
    return user.getIdToken()
  },

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    const auth = getFirebaseAuth()
    return onAuthStateChanged(auth, (firebaseUser) => {
      callback(firebaseUser ? toAuthUser(firebaseUser) : null)
    })
  },
}
