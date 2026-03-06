import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.css'

function Navigation() {
  const [showEventDropdown, setShowEventDropdown] = useState(false)

  const eventCategories = [
    'Photoshoot Bookings',
    'Bridal Makeup',
    'Catering',
    'Decorations',
    'Function Hall',
    'Cab Bookings'
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div 
          className="nav-item dropdown"
          onMouseEnter={() => setShowEventDropdown(true)}
          onMouseLeave={() => setShowEventDropdown(false)}
        >
          <span className="nav-link">Event Bookings ▼</span>
          {showEventDropdown && (
            <div className="dropdown-menu">
              {eventCategories.map((category, index) => (
                <Link key={index} to={`/bookings/${category.toLowerCase().replace(/\s+/g, '-')}`} className="dropdown-item">
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/pricing" className="nav-link">Pricing</Link>
        <Link to="/service-providers" className="nav-link">Service Providers</Link>
        <Link to="/features" className="nav-link">Features</Link>
        <Link to="/resources" className="nav-link">Resources</Link>
      </div>
    </nav>
  )
}

export default Navigation
