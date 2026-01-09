import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm h-16 flex items-center px-6">
        <h1 className="text-xl font-bold text-red-600">SIMS PPOB</h1>
      </header>
      <main className="p-6">
        {children}
      </main>
      <footer className="bg-white border-t p-6 text-center text-gray-500">
        &copy; 2026 SIMS PPOB - Muhammad Naufan Athoillah
      </footer>
    </div>
  )
}
