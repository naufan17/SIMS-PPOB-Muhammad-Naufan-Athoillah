import Header from '@/components/Header'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}
