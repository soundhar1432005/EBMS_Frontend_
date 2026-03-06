import { useNavigate } from 'react-router-dom'
import './SignUpSelection.css'

function SignUpSelection() {
  const navigate = useNavigate()

  return (
    <div className="signup-selection-container">
      <div className="selection-content">
        <h1>Join Our Platform</h1>
        <p className="subtitle">Choose how you want to get started</p>
        
        <div className="selection-cards">
          <div className="selection-card" onClick={() => navigate('/signup/client')}>
            <h2>Book an Event</h2>
            <p>Find and book services for your special occasions</p>
            <ul className="card-features">
              <li>Browse service providers</li>
              <li>Book photographers, makeup artists, caterers</li>
              <li>Manage your bookings</li>
              <li>Leave reviews and feedback</li>
            </ul>
            <button className="selection-btn client-btn">Sign Up as Client</button>
          </div>

          <div className="selection-card" onClick={() => navigate('/signup/provider')}>
            <h2>Service Provider</h2>
            <p>Grow your business by offering your services</p>
            <ul className="card-features">
              <li>Create your business profile</li>
              <li>Receive booking requests</li>
              <li>Manage your calendar</li>
              <li>Build your reputation with reviews</li>
            </ul>
            <button className="selection-btn provider-btn">Sign Up as Provider</button>
          </div>
        </div>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}

export default SignUpSelection
