import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, ShieldCheck, X, User } from 'lucide-react'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Docs Library', path: '/docs' },
  { label: 'Document Generator', path: '/document-generator', requiresAuth: true },
  { label: 'Insights', path: '/insights' },
  { label: 'Lawyer Connect', path: '/lawyer-connect', requiresAuth: true },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignInClick = () => {
    navigate('/login')
  }

  const handleSignOut = async () => {
    try {
      setAuthLoading(true)
      await signOut()
    } catch (error) {
      console.error('Sign out failed:', error)
      alert(`Sign out failed: ${error.message || 'Unknown error occurred'}`)
    } finally {
      setAuthLoading(false)
    }
  }

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const baseLinkClasses =
    "relative text-sm font-medium transition-colors duration-300 hover:text-gold-300 after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:h-0.5 after:w-8 after:-translate-x-1/2 after:rounded-full after:opacity-0 after:transition-opacity after:duration-300"

  const getLinkClasses = (path) =>
    `${baseLinkClasses} ${
      isActivePath(path) ? 'text-gold-400 after:bg-gold-400 after:opacity-100' : 'text-soft-white'
    }`

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="bg-deep-blue/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div>
              <span className="text-2xl font-bold text-soft-white">
                Lex<span className="text-gold-400">Ease</span>
              </span>
              <p className="text-xs uppercase tracking-[0.35em] text-soft-white/70 hidden sm:block">
                Legal AI
              </p>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(({ label, path, requiresAuth }) => (
              <Link key={path} to={path} className={getLinkClasses(path)}>
                <span className="inline-flex items-center gap-1.5">
                  {label}
                  {requiresAuth && <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />}
                </span>
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-soft-white">
                  <User className="w-5 h-5 text-gold-400" />
                  <span className="text-sm max-w-[180px] truncate">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  disabled={authLoading}
                  className="bg-gold-500 hover:bg-gold-600 text-deep-blue px-4 py-2 rounded-lg transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? 'Signing Out...' : 'Sign Out'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignInClick}
                className="bg-gold-500 hover:bg-gold-600 text-deep-blue px-4 py-2 rounded-lg transition duration-300 font-medium shadow-md shadow-gold-500/30"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-soft-white p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-haspopup="true"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-nav" className="md:hidden py-4 space-y-2 bg-deep-blue border-t border-white/10">
            {NAV_LINKS.map(({ label, path, requiresAuth }) => (
              <Link
                key={path}
                to={path}
                className={`${getLinkClasses(path)} block px-1 py-2`}
                onClick={closeMobileMenu}
              >
                <span className="inline-flex items-center gap-2">
                  {label}
                  {requiresAuth && (
                    <span className="text-[11px] font-semibold text-gold-400 inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Pro
                    </span>
                  )}
                </span>
              </Link>
            ))}
            {user ? (
              <div className="pt-4 border-t border-gray-700 space-y-3">
                <div className="flex items-center space-x-2 text-soft-white">
                  <User className="w-5 h-5 text-gold-400" />
                  <span className="text-sm">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleSignOut()
                    closeMobileMenu()
                  }}
                  disabled={authLoading}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-deep-blue px-4 py-2 rounded-lg transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? 'Signing Out...' : 'Sign Out'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleSignInClick()
                  closeMobileMenu()
                }}
                className="w-full bg-gold-500 hover:bg-gold-600 text-deep-blue px-4 py-2 rounded-lg transition duration-300 font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
