import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [language, setLanguage] = useState('EN')
  const [user, setUser] = useState(null)
  const [showSignUpMenu, setShowSignUpMenu] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Check if user is logged in whenever location changes
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser(null)
    }
  }, [location])

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSignUpMenu(false)
      }
    }

    // Add event listener when dropdown is open
    if (showSignUpMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSignUpMenu])

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('provider')
    setUser(null)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="studio-name">
            EBMS
          </Link>
        </div>
        <div className="header-right">
          {user ? (
            <>
              <span className="user-welcome">Welcome, {user.name}</span>
              <Link to="/dashboard" className="header-link">Dashboard</Link>
              <button onClick={handleLogout} className="header-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-link">Login</Link>
              <div className="signup-dropdown" ref={dropdownRef}>
                <button 
                  className="header-btn"
                  onClick={() => setShowSignUpMenu(!showSignUpMenu)}
                >
                  Sign Up ▼
                </button>
                {showSignUpMenu && (
                  <div className="signup-menu">
                    <Link 
                      to="/signup/client" 
                      className="signup-menu-item"
                      onClick={() => setShowSignUpMenu(false)}
                    >
                      <span className="menu-icon"></span>
                      <div>
                        <div className="menu-title">Book an Event</div>
                        <div className="menu-desc">For clients</div>
                      </div>
                    </Link>
                    <Link 
                      to="/signup/provider" 
                      className="signup-menu-item"
                      onClick={() => setShowSignUpMenu(false)}
                    >
                      <span className="menu-icon"></span>
                      <div>
                        <div className="menu-title">Service Provider</div>
                        <div className="menu-desc">For businesses</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
          <select 
            className="language-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
            <option value="FR">FR</option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default Header
