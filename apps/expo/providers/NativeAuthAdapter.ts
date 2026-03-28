import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from '@react-native-firebase/auth'
import { getApp } from '@react-native-firebase/app'
import type { AuthAdapter, AuthUser } from '@scaffold/app/features/auth/domain/types'
import type { User } from '@react-native-firebase/auth'

function toAuthUser(firebaseUser: User): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    token: null,
  }
}

const authInstance = getAuth(getApp())

export const nativeAuthAdapter: AuthAdapter = {
  async signIn(email: string, password: string): Promise<AuthUser> {
    const result = await signInWithEmailAndPassword(authInstance, email, password)
    return toAuthUser(result.user)
  },

  async signOut(): Promise<void> {
    await firebaseSignOut(authInstance)
  },

  async getIdToken(): Promise<string | null> {
    const user = authInstance.currentUser
    if (!user) return null
    return user.getIdToken()
  },

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(authInstance, (firebaseUser) => {
      callback(firebaseUser ? toAuthUser(firebaseUser) : null)
    })
  },
}
