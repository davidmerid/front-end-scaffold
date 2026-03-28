'use client'

import dynamic from 'next/dynamic'

const LoginScreen = dynamic(
  () => import('@scaffold/app/features/auth/screen').then((m) => ({ default: m.LoginScreen })),
  { ssr: false }
)

export default function LoginPage() {
  return <LoginScreen />
}
