'use client'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // Auth guard will be wired in Phase 4
  return <>{children}</>
}
