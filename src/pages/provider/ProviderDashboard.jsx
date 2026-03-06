import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProviderDashboard.css'

function ProviderDashboard() {
  const navigate = useNavigate()
  const [provider, setProvider] = useState(null)
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    totalRevenue: 0
  })
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in as provider
    const userData = localStorage.getItem('user')
    const providerData = localStorage.getItem('provider')
    
    if (!userData || !providerData) {
      navigate('/login/provider')
      return
    }

    const parsedUser = JSON.parse(userData)
    const parsedProvider = JSON.parse(providerData)

    if (parsedUser.role !== 'provider') {
      navigate('/')
      return
    }

    setUser(parsedUser)
    setProvider(parsedProvider)
    fetchDashboardData(parsedProvider.id)
  }, [navigate])

  const fetchDashboardData = async (providerId) => {
    try {
      const token = localStorage.getItem('token')
      
      // Fetch provider stats
      const statsResponse = await fetch(`http://localhost:5000/api/provider/stats/${providerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch upcoming bookings
      const bookingsResponse = await fetch(`http://localhost:5000/api/provider/bookings/${providerId}?status=upcoming`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json()
        setUpcomingBookings(bookingsData)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('provider')
    navigate('/')
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="provider-dashboard">
      {/* Header */}
      <header className="provider-header">
        <div className="header-left">
          {provider?.business_logo && (
            <img src={`http://localhost:5000${provider.business_logo}`} alt="Logo" className="business-logo" />
          )}
          <div className="business-info">
            <h1>{provider?.business_name}</h1>
            <p className="service-type">{provider?.service_type}</p>
          </div>
        </div>
        <div className="header-right">
          <button className="profile-btn" onClick={() => navigate('/provider/profile')}>
            Profile
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completedEvents}</h3>
            <p>Completed Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Calendar Section */}
        <div className="calendar-section">
          <h2>Calendar</h2>
          <div className="calendar-placeholder">
            <p>📅 Calendar view coming soon</p>
            <button className="view-calendar-btn" onClick={() => navigate('/provider/calendar')}>
              View Full Calendar
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-section">
          <h2>Upcoming Events</h2>
          {upcomingBookings.length === 0 ? (
            <div className="no-bookings">
              <p>No upcoming events</p>
            </div>
          ) : (
            <div className="bookings-list">
              {upcomingBookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <div className="booking-date">
                    <span className="date">{new Date(booking.booking_date).toLocaleDateString()}</span>
                    <span className="time">{booking.booking_time}</span>
                  </div>
                  <div className="booking-details">
                    <h4>{booking.client_name}</h4>
                    <p>{booking.event_location}</p>
                    <p className="phone">📞 {booking.client_phone}</p>
                  </div>
                  <div className="booking-status">
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="view-all-btn" onClick={() => navigate('/provider/bookings')}>
            View All Bookings
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard
