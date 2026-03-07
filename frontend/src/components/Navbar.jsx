import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, ShieldCheck, X, User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Docs Library', path: '/docs' },
  { label: 'Insights', path: '/insights' },
  { label: 'Lawyer Connect', path: '/lawyer-connect', requiresAuth: true },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Detect scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false)
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileMenuOpen])

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
    "relative text-sm font-medium transition-all duration-300 hover:text-gold-300 after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:transition-all after:duration-300 hover:after:w-8"

  const getLinkClasses = (path) =>
    `${baseLinkClasses} ${isActivePath(path) ? 'text-gold-400 after:bg-gold-400 after:w-8 after:opacity-100' : 'text-soft-white after:bg-gold-400 after:opacity-0 hover:after:opacity-100'
    }`

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav
      ref={menuRef}
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-deep-blue/98 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
        : 'bg-deep-blue/95 backdrop-blur-md border-b border-white/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div>
              <span className="text-2xl font-bold text-soft-white transition-colors duration-300">
                Lex<span className="text-gold-400 group-hover:text-gold-300 transition-colors duration-300">Ease</span>
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
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
                    <User className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="text-sm max-w-[140px] truncate">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  disabled={authLoading}
                  className="bg-gold-500 hover:bg-gold-400 text-deep-blue px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-gold-500/20 active:scale-95 transition-all duration-300"
                >
                  {authLoading ? 'Signing Out...' : 'Sign Out'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignInClick}
                className="bg-gold-500 hover:bg-gold-400 text-deep-blue px-5 py-2 rounded-lg font-medium shadow-md shadow-gold-500/20 hover:shadow-lg hover:shadow-gold-500/30 active:scale-95 transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-soft-white p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-200"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-haspopup="true"
          >
            <div className="relative w-6 h-6">
              <X className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} />
              <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu with animation */}
        <div
          id="mobile-nav"
          className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${mobileMenuOpen
            ? 'max-h-[500px] opacity-100 pb-4 pointer-events-auto'
            : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          style={{
            transitionProperty: 'max-height, opacity, padding',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDuration: mobileMenuOpen ? '0.4s' : '0.25s',
          }}
        >
          <div className="pt-2 space-y-1 border-t border-white/10">
            {NAV_LINKS.map(({ label, path, requiresAuth }, idx) => (
              <Link
                key={path}
                to={path}
                className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isActivePath(path)
                  ? 'text-gold-400 bg-gold-400/10'
                  : 'text-soft-white hover:bg-white/5 hover:text-gold-300'
                  }`}
                onClick={closeMobileMenu}
                style={{
                  animationDelay: mobileMenuOpen ? `${idx * 50}ms` : '0ms',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                  transition: `opacity 0.3s ${idx * 50}ms, transform 0.3s ${idx * 50}ms`
                }}
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
            <div className="pt-3 mt-2 border-t border-white/10">
              {user ? (
                <div className="space-y-3 px-3">
                  <div className="flex items-center space-x-2 text-soft-white">
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
                      <User className="w-4 h-4 text-gold-400" />
                    </div>
                    <span className="text-sm">{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut()
                      closeMobileMenu()
                    }}
                    disabled={authLoading}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-deep-blue px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-300"
                  >
                    {authLoading ? 'Signing Out...' : 'Sign Out'}
                  </button>
                </div>
              ) : (
                <div className="px-3">
                  <button
                    onClick={() => {
                      handleSignInClick()
                      closeMobileMenu()
                    }}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-deep-blue px-4 py-3 rounded-lg font-medium active:scale-[0.98] transition-all duration-300"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
