import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [pendingProviders, setPendingProviders] = useState([])
  const [allProviders, setAllProviders] = useState([])
  const [clients, setClients] = useState([])
  const [bookings, setBookings] = useState([])
  const [feedback, setFeedback] = useState([])
  const [calendarEvents, setCalendarEvents] = useState([])
  const [activities, setActivities] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [providerAnalytics, setProviderAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'admin') {
      navigate('/login/admin')
      return
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (activeTab === 'calendar') {
      fetchCalendarEvents()
    }
  }, [activeTab, currentMonth, currentYear])

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login/admin')
        return
      }

      await Promise.all([
        fetchStats(token),
        fetchPendingProviders(token),
        fetchActivities(token)
      ])

      setLoading(false)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data')
      setLoading(false)
    }
  }

  const fetchStats = async (token) => {
    const res = await fetch('http://localhost:5000/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setStats(data)
  }

  const fetchPendingProviders = async (token) => {
    const res = await fetch('http://localhost:5000/api/admin/providers/pending', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setPendingProviders(data)
  }

  const fetchAllProviders = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5000/api/admin/providers', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setAllProviders(data)
  }

  const fetchClients = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5000/api/admin/clients', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setClients(data)
  }

  const fetchBookings = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5000/api/admin/bookings', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setBookings(data)
  }

  const fetchFeedback = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5000/api/admin/feedback', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setFeedback(data)
  }

  const fetchCalendarEvents = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:5000/api/admin/calendar/events?month=${currentMonth}&year=${currentYear}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setCalendarEvents(data)
  }

  const fetchActivities = async (token) => {
    const res = await fetch('http://localhost:5000/api/admin/activities', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setActivities(data)
  }

  const fetchProviderAnalytics = async (providerId) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:5000/api/admin/providers/${providerId}/analytics`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setProviderAnalytics(data)
  }

  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/admin/providers/${userId}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        alert('Provider approved successfully!')
        fetchPendingProviders(token)
        fetchStats(token)
      }
    } catch (err) {
      alert('Failed to approve provider')
    }
  }

  const handleReject = async (userId) => {
    if (!confirm('Are you sure you want to reject this provider?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/admin/providers/${userId}/reject`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        alert('Provider rejected')
        fetchPendingProviders(token)
      }
    } catch (err) {
      alert('Failed to reject provider')
    }
  }

  const handleToggleStatus = async (userId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/admin/providers/${userId}/toggle-status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        alert('Provider status updated')
        fetchAllProviders()
      }
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const handleDeleteUser = async (userId, role) => {
    if (!confirm(`Are you sure you want to delete this ${role}?`)) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        alert('User deleted successfully')
        if (role === 'provider') fetchAllProviders()
        if (role === 'client') fetchClients()
        fetchStats(localStorage.getItem('token'))
      }
    } catch (err) {
      alert('Failed to delete user')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'providers' && allProviders.length === 0) fetchAllProviders()
    if (tab === 'clients' && clients.length === 0) fetchClients()
    if (tab === 'bookings' && bookings.length === 0) fetchBookings()
    if (tab === 'feedback' && feedback.length === 0) fetchFeedback()
  }

  const handleViewProviderDetails = (providerId) => {
    setSelectedProvider(providerId)
    fetchProviderAnalytics(providerId)
  }

  if (loading) return <div className="admin-loading">Loading Admin Dashboard...</div>
  if (error) return <div className="admin-error">{error}</div>

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>🔐 Admin Dashboard</h1>
          <p>Complete System Management</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {stats && (
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <h3>Total Clients</h3>
              <p className="stat-number">{stats.totalClients}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div>
              <h3>Approved Providers</h3>
              <p className="stat-number">{stats.totalProviders}</p>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div>
              <h3>Pending Approvals</h3>
              <p className="stat-number">{stats.pendingProviders}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <h3>Total Bookings</h3>
              <p className="stat-number">{stats.totalBookings}</p>
            </div>
          </div>
        </div>
      )}

      <div className="admin-tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabChange('overview')}>
          📊 Overview
        </button>
        <button className={activeTab === 'approvals' ? 'active' : ''} onClick={() => handleTabChange('approvals')}>
          ✅ Approvals ({pendingProviders.length})
        </button>
        <button className={activeTab === 'providers' ? 'active' : ''} onClick={() => handleTabChange('providers')}>
          🏢 Providers
        </button>
        <button className={activeTab === 'clients' ? 'active' : ''} onClick={() => handleTabChange('clients')}>
          👥 Clients
        </button>
        <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => handleTabChange('bookings')}>
          📅 Bookings
        </button>
        <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => handleTabChange('calendar')}>
          📆 Calendar
        </button>
        <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => handleTabChange('feedback')}>
          💬 Feedback
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <OverviewTab activities={activities} pendingProviders={pendingProviders} handleApprove={handleApprove} />
        )}
        
        {activeTab === 'approvals' && (
          <ApprovalsTab 
            pendingProviders={pendingProviders} 
            handleApprove={handleApprove} 
            handleReject={handleReject} 
          />
        )}
        
        {activeTab === 'providers' && (
          <ProvidersTab 
            providers={allProviders} 
            handleToggleStatus={handleToggleStatus}
            handleDeleteUser={handleDeleteUser}
            handleViewDetails={handleViewProviderDetails}
            selectedProvider={selectedProvider}
            providerAnalytics={providerAnalytics}
            setSelectedProvider={setSelectedProvider}
          />
        )}
        
        {activeTab === 'clients' && (
          <ClientsTab clients={clients} handleDeleteUser={handleDeleteUser} />
        )}
        
        {activeTab === 'bookings' && (
          <BookingsTab bookings={bookings} />
        )}
        
        {activeTab === 'calendar' && (
          <CalendarTab 
            events={calendarEvents} 
            currentMonth={currentMonth}
            currentYear={currentYear}
            setCurrentMonth={setCurrentMonth}
            setCurrentYear={setCurrentYear}
          />
        )}
        
        {activeTab === 'feedback' && (
          <FeedbackTab feedback={feedback} />
        )}
      </div>
    </div>
  )
}

// Tab Components below...

// Overview Tab Component
function OverviewTab({ activities, pendingProviders, handleApprove }) {
  if (!activities) return <div>Loading activities...</div>

  return (
    <div className="overview-tab">
      <div className="overview-grid">
        <div className="overview-section">
          <h2>📋 Recent Bookings</h2>
          {activities.recentBookings.length === 0 ? (
            <p className="no-data">No recent bookings</p>
          ) : (
            <div className="activity-list">
              {activities.recentBookings.map((booking) => (
                <div key={booking._id} className="activity-item">
                  <span className="activity-icon">📅</span>
                  <div>
                    <p><strong>{booking.service_type}</strong></p>
                    <p className="activity-date">{new Date(booking.booking_date).toLocaleDateString()}</p>
                  </div>
                  <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="overview-section">
          <h2>🏢 Recent Provider Registrations</h2>
          {activities.recentProviders.length === 0 ? (
            <p className="no-data">No recent providers</p>
          ) : (
            <div className="activity-list">
              {activities.recentProviders.map((provider) => (
                <div key={provider._id} className="activity-item">
                  <span className="activity-icon">👤</span>
                  <div>
                    <p><strong>{provider.name}</strong></p>
                    <p className="activity-date">{provider.email}</p>
                  </div>
                  <span className={`status-badge ${provider.isApproved ? 'approved' : 'pending'}`}>
                    {provider.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="overview-section">
          <h2>💬 Recent Feedback</h2>
          {activities.recentFeedback.length === 0 ? (
            <p className="no-data">No recent feedback</p>
          ) : (
            <div className="activity-list">
              {activities.recentFeedback.map((fb) => (
                <div key={fb._id} className="activity-item">
                  <span className="activity-icon">⭐</span>
                  <div>
                    <p><strong>{fb.client_id?.name}</strong> → {fb.provider_id?.business_name}</p>
                    <p className="activity-date">Rating: {fb.rating}/5</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {pendingProviders.length > 0 && (
          <div className="overview-section urgent">
            <h2>⚠️ Urgent: Pending Approvals</h2>
            <div className="activity-list">
              {pendingProviders.slice(0, 3).map(({ user, provider }) => (
                <div key={user._id} className="activity-item">
                  <span className="activity-icon">⏳</span>
                  <div>
                    <p><strong>{provider?.business_name}</strong></p>
                    <p className="activity-date">{user.email}</p>
                  </div>
                  <button onClick={() => handleApprove(user._id)} className="quick-approve-btn">
                    Approve
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Approvals Tab Component
function ApprovalsTab({ pendingProviders, handleApprove, handleReject }) {
  return (
    <div className="approvals-tab">
      <h2>Provider Approval Requests</h2>
      {pendingProviders.length === 0 ? (
        <p className="no-data">No pending approvals</p>
      ) : (
        pendingProviders.map(({ user, provider }) => (
          <div key={user._id} className="provider-card pending-card">
            <div className="provider-info">
              {provider?.shop_logo && (
                <img 
                  src={`http://localhost:5000${provider.shop_logo}`} 
                  alt="Logo" 
                  className="provider-logo"
                />
              )}
              <div className="provider-details">
                <h3>{provider?.business_name || 'N/A'}</h3>
                <div className="detail-grid">
                  <div><strong>Owner:</strong> {user.name}</div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Phone:</strong> {user.phone}</div>
                  <div><strong>Service:</strong> {provider?.service_type}</div>
                  <div><strong>Location:</strong> {provider?.shop_location}</div>
                  <div><strong>Business Email:</strong> {provider?.email}</div>
                </div>
                <div className="contact-numbers">
                  <strong>Contact Numbers:</strong> {provider?.contact_number}, {provider?.contact_number_2}, {provider?.contact_number_3}
                </div>
              </div>
            </div>
            <div className="provider-actions">
              <button onClick={() => handleApprove(user._id)} className="approve-btn">
                ✓ Approve
              </button>
              <button onClick={() => handleReject(user._id)} className="reject-btn">
                ✗ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// Providers Tab Component
function ProvidersTab({ providers, handleToggleStatus, handleDeleteUser, handleViewDetails, selectedProvider, providerAnalytics, setSelectedProvider }) {
  if (selectedProvider && providerAnalytics) {
    return (
      <div className="provider-analytics">
        <button onClick={() => setSelectedProvider(null)} className="back-btn">← Back to Providers</button>
        <h2>Provider Analytics: {providerAnalytics.provider.business_name}</h2>
        
        <div className="analytics-stats">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p className="stat-number">{providerAnalytics.stats.totalBookings}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">{providerAnalytics.stats.completedBookings}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number">{providerAnalytics.stats.pendingBookings}</p>
          </div>
          <div className="stat-card">
            <h3>Cancelled</h3>
            <p className="stat-number">{providerAnalytics.stats.cancelledBookings}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-number">₹{providerAnalytics.stats.totalRevenue}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p className="stat-number">{providerAnalytics.stats.averageRating.toFixed(1)} ⭐</p>
          </div>
        </div>

        <div className="provider-full-details">
          <h3>Provider Information</h3>
          <div className="detail-grid">
            <div><strong>Business Name:</strong> {providerAnalytics.provider.business_name}</div>
            <div><strong>Service Type:</strong> {providerAnalytics.provider.service_type}</div>
            <div><strong>Owner:</strong> {providerAnalytics.provider.user_id.name}</div>
            <div><strong>Email:</strong> {providerAnalytics.provider.user_id.email}</div>
            <div><strong>Phone:</strong> {providerAnalytics.provider.user_id.phone}</div>
            <div><strong>Location:</strong> {providerAnalytics.provider.shop_location}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="providers-tab">
      <h2>All Service Providers</h2>
      {providers.length === 0 ? (
        <p className="no-data">No providers registered</p>
      ) : (
        <div className="providers-grid">
          {providers.map(({ user, provider }) => (
            <div key={user._id} className={`provider-card-small ${user.isActive ? 'active' : 'inactive'}`}>
              {provider?.shop_logo && (
                <img 
                  src={`http://localhost:5000${provider.shop_logo}`} 
                  alt="Logo" 
                  className="provider-logo-small"
                />
              )}
              <h3>{provider?.business_name || 'N/A'}</h3>
              <p><strong>{provider?.service_type}</strong></p>
              <p>{user.email}</p>
              <div className="status-badges">
                <span className={`status-badge ${user.isApproved ? 'approved' : 'pending'}`}>
                  {user.isApproved ? 'Approved' : 'Pending'}
                </span>
                <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="provider-actions-small">
                <button onClick={() => handleViewDetails(provider._id)} className="view-btn">
                  View Details
                </button>
                <button onClick={() => handleToggleStatus(user._id)} className="toggle-btn">
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDeleteUser(user._id, 'provider')} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Clients Tab Component
function ClientsTab({ clients, handleDeleteUser }) {
  return (
    <div className="clients-tab">
      <h2>All Clients</h2>
      {clients.length === 0 ? (
        <p className="no-data">No clients registered</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bookings</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone || 'N/A'}</td>
                <td>{client.bookingCount}</td>
                <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDeleteUser(client._id, 'client')} className="delete-btn-small">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// Bookings Tab Component
function BookingsTab({ bookings }) {
  return (
    <div className="bookings-tab">
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-data">No bookings found</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.service_type}</td>
                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td>{booking.booking_time}</td>
                <td>{booking.location}</td>
                <td>₹{booking.total_price}</td>
                <td>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// Calendar Tab Component
function CalendarTab({ events, currentMonth, currentYear, setCurrentMonth, setCurrentYear }) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="calendar-tab">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>← Prev</button>
        <h2>{monthNames[currentMonth - 1]} {currentYear}</h2>
        <button onClick={handleNextMonth}>Next →</button>
      </div>
      
      <div className="calendar-events">
        <h3>Events this month: {events.length}</h3>
        {events.length === 0 ? (
          <p className="no-data">No events scheduled</p>
        ) : (
          <div className="events-list">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-date">
                  <span className="event-day">{new Date(event.booking_date).getDate()}</span>
                  <span className="event-month">{monthNames[new Date(event.booking_date).getMonth()].slice(0, 3)}</span>
                </div>
                <div className="event-details">
                  <h4>{event.service_type}</h4>
                  <p><strong>Provider:</strong> {event.provider_id?.business_name || 'N/A'}</p>
                  <p><strong>Time:</strong> {event.booking_time}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <span className={`status-badge ${event.status}`}>{event.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Feedback Tab Component
function FeedbackTab({ feedback }) {
  return (
    <div className="feedback-tab">
      <h2>Client Feedback</h2>
      {feedback.length === 0 ? (
        <p className="no-data">No feedback submitted</p>
      ) : (
        <div className="feedback-list">
          {feedback.map((fb) => (
            <div key={fb._id} className="feedback-card">
              <div className="feedback-header">
                <div>
                  <h4>{fb.client_id?.name || 'Anonymous'}</h4>
                  <p className="feedback-provider">For: {fb.provider_id?.business_name || 'N/A'}</p>
                </div>
                <div className="feedback-rating">
                  {'⭐'.repeat(fb.rating)}
                  <span>{fb.rating}/5</span>
                </div>
              </div>
              <p className="feedback-comment">{fb.comment}</p>
              <p className="feedback-date">{new Date(fb.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
