import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

import Logo from "@/assets/images/Logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { to: "/topup", label: "Top Up" },
    { to: "/transaction", label: "Transaksi" },
    { to: "/account", label: "Akun" },
  ]

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto py-4 px-6 lg:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <img 
            src={Logo} 
            className="w-8 h-8 object-contain"
            alt="Logo SIMS PPOB"
          />
          <h4 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">
            SIMS PPOB
          </h4>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => `
                    text-sm font-semibold transition-all duration-200 hover:text-red-500
                    ${isActive ? 'text-red-600' : 'text-gray-600'}
                  `}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`
        md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 transform
        ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'}
      `}>
        <ul className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink 
                to={link.to} 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200
                  ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50 hover:text-red-500'}
                `}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
