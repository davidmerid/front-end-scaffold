import { describe, it, expect } from 'vitest'
import type { AuthUser, AuthState, AuthAdapter } from '../types'

describe('Auth domain types', () => {
  it('should define AuthUser interface correctly', () => {
    const user: AuthUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      token: 'jwt-token',
    }
    expect(user.uid).toBe('123')
    expect(user.email).toBe('test@example.com')
    expect(user.displayName).toBe('Test User')
    expect(user.token).toBe('jwt-token')
  })

  it('should allow null fields in AuthUser', () => {
    const user: AuthUser = {
      uid: '123',
      email: null,
      displayName: null,
      token: null,
    }
    expect(user.email).toBeNull()
    expect(user.displayName).toBeNull()
    expect(user.token).toBeNull()
  })

  it('should define AuthState type correctly', () => {
    const states: AuthState[] = ['loading', 'authenticated', 'unauthenticated']
    expect(states).toHaveLength(3)
    expect(states).toContain('loading')
    expect(states).toContain('authenticated')
    expect(states).toContain('unauthenticated')
  })

  it('should define AuthAdapter interface', () => {
    // Type check: ensure interface has required methods
    const adapter: AuthAdapter = {
      signIn: async () => ({ uid: '', email: null, displayName: null, token: null }),
      signOut: async () => {},
      getIdToken: async () => null,
      onAuthStateChanged: () => () => {},
    }
    expect(adapter.signIn).toBeDefined()
    expect(adapter.signOut).toBeDefined()
    expect(adapter.getIdToken).toBeDefined()
    expect(adapter.onAuthStateChanged).toBeDefined()
  })
})
