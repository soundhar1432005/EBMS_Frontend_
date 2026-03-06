import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './BookingForm.css'

function BookingForm() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedProviderDetails, setSelectedProviderDetails] = useState(null)
  const [selectedEventTypes, setSelectedEventTypes] = useState([])
  const [serviceProviders, setServiceProviders] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    eventDate: '',
    eventTime: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventLocation: '',
    numberOfPeople: '',
    mealType: '',
    vehicleType: '',
    pickupLocation: '',
    selectedProvider: '',
    additionalNotes: ''
  })

  const photoshootEventTypes = [
    'Wedding Photography',
    'Pre-Wedding Shoot',
    'Engagement Photography',
    'Birthday Party',
    'Baby Shower',
    'Maternity Shoot',
    'Newborn Photography',
    'Family Portrait',
    'Corporate Event',
    'Product Photography',
    'Fashion Shoot',
    'Portfolio Shoot',
    'Anniversary Celebration',
    'Graduation Ceremony',
    'Cultural Event'
  ]

  // Fetch service providers from API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const categoryMap = {
          'photoshoot-bookings': 'photoshoot',
          'bridal-makeup': 'bridal-makeup',
          'catering': 'catering',
          'cab-bookings': 'cab-bookings'
        }
        
        const apiCategory = categoryMap[category]
        if (!apiCategory) return

        const response = await fetch(`http://localhost:5000/api/providers?category=${apiCategory}`)
        const data = await response.json()
        setServiceProviders(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching providers:', error)
        setLoading(false)
      }
    }

    fetchProviders()
  }, [category])

  const handleProviderClick = (provider) => {
    setSelectedProviderDetails(provider)
    setShowModal(true)
  }

  const handleSelectProvider = (providerId) => {
    setFormData({ ...formData, selectedProvider: providerId })
    setShowModal(false)
  }

  const handleEventTypeToggle = (eventType) => {
    setSelectedEventTypes(prev => 
      prev.includes(eventType)
        ? prev.filter(type => type !== eventType)
        : [...prev, eventType]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.selectedProvider) {
      alert('Please select a service provider')
      return
    }

    if (category === 'photoshoot-bookings' && selectedEventTypes.length === 0) {
      alert('Please select at least one event type')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to continue')
      navigate('/login')
      return
    }

    const submissionData = {
      booking_type: category,
      provider_id: formData.selectedProvider,
      booking_date: formData.eventDate,
      booking_time: formData.eventTime,
      event_location: formData.eventLocation,
      event_types: category === 'photoshoot-bookings' ? selectedEventTypes : null,
      number_of_people: formData.numberOfPeople || null,
      meal_type: formData.mealType || null,
      vehicle_type: formData.vehicleType || null,
      pickup_location: formData.pickupLocation || null,
      notes: formData.additionalNotes,
      client_name: formData.clientName,
      client_email: formData.clientEmail,
      client_phone: formData.clientPhone,
      total_price: 0, // Calculate based on service
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submissionData)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Booking request submitted successfully!')
        navigate('/dashboard')
      } else {
        alert(data.error || 'Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Network error. Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getCategoryTitle = () => {
    const titles = {
      'photoshoot-bookings': 'Photo Shoot Booking',
      'bridal-makeup': 'Bridal Makeup Booking',
      'catering': 'Catering Service Booking',
      'function-hall': 'Function Hall Booking',
      'cab-bookings': 'Cab Booking'
    }
    return titles[category] || 'Event Booking'
  }

  return (
    <div className="booking-form-page">
      <div className="booking-container">
        <h1>{getCategoryTitle()}</h1>
        
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <h2>Client Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Location Address *</label>
                <input
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Event Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Event Date *</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Time *</label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {category === 'photoshoot-bookings' && (
              <div className="form-group">
                <label>Select Event Types * (Hold Ctrl/Cmd to select multiple)</label>
                <select
                  multiple
                  className="event-types-select"
                  value={selectedEventTypes}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value)
                    setSelectedEventTypes(options)
                  }}
                  required
                  size="8"
                >
                  {photoshootEventTypes.map((eventType, index) => (
                    <option key={index} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
                {selectedEventTypes.length > 0 && (
                  <div className="selected-events-display">
                    <p className="selected-count">Selected: {selectedEventTypes.length} event type(s)</p>
                    <div className="selected-tags">
                      {selectedEventTypes.map((type, index) => (
                        <span key={index} className="selected-tag">
                          {type}
                          <button
                            type="button"
                            className="remove-tag"
                            onClick={() => handleEventTypeToggle(type)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {category === 'catering' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Meal Type *</label>
                    <select name="mealType" value={formData.mealType} onChange={handleChange} required>
                      <option value="">Select Meal Type</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="snacks">Snacks</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Number of People *</label>
                    <input
                      type="number"
                      name="numberOfPeople"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {category === 'cab-bookings' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Vehicle Type *</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
                      <option value="">Select Vehicle Type</option>
                      <option value="4-seater">4-Seater</option>
                      <option value="6-seater">6-Seater</option>
                      <option value="8-seater">8-Seater</option>
                      <option value="luxury">Luxury Vehicle</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Pickup Location *</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {serviceProviders.length > 0 && (
            <div className="form-section">
              <h2>Select Service Provider</h2>
              <p className="section-hint">Click on a provider card to view full details</p>
              {loading ? (
                <p>Loading providers...</p>
              ) : (
                <div className="providers-grid">
                  {serviceProviders.map((provider) => (
                    <div
                      key={provider._id}
                      className={`provider-card ${formData.selectedProvider === provider._id ? 'selected' : ''}`}
                      onClick={() => handleProviderClick(provider)}
                    >
                      <h3>{provider.name}</h3>
                      <p className="provider-rating">⭐ {provider.rating}</p>
                      {provider.studio_name && <p><strong>Studio:</strong> {provider.studio_name}</p>}
                      {provider.salon_name && <p><strong>Salon:</strong> {provider.salon_name}</p>}
                      {provider.specialty && <p><strong>Specialty:</strong> {provider.specialty}</p>}
                      <button type="button" className="view-details-btn">View Details</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="form-section">
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="4"
                placeholder="Any special requirements or notes..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Booking Request
            </button>
          </div>
        </form>
      </div>

      {/* Provider Details Modal */}
      {showModal && selectedProviderDetails && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h2>{selectedProviderDetails.name}</h2>
            <div className="modal-body">
              <div className="provider-detail-section">
                <h3>Contact Information</h3>
                <p><strong>Primary:</strong> <a href={`tel:${selectedProviderDetails.contact_number}`}>{selectedProviderDetails.contact_number}</a></p>
                {selectedProviderDetails.contact_number_2 && (
                  <p><strong>Secondary:</strong> <a href={`tel:${selectedProviderDetails.contact_number_2}`}>{selectedProviderDetails.contact_number_2}</a></p>
                )}
                {selectedProviderDetails.contact_number_3 && (
                  <p><strong>Tertiary:</strong> <a href={`tel:${selectedProviderDetails.contact_number_3}`}>{selectedProviderDetails.contact_number_3}</a></p>
                )}
              </div>

              {selectedProviderDetails.studio_name && (
                <div className="provider-detail-section">
                  <h3>Studio</h3>
                  <p>{selectedProviderDetails.studio_name}</p>
                </div>
              )}

              {selectedProviderDetails.salon_name && (
                <div className="provider-detail-section">
                  <h3>Salon</h3>
                  <p>{selectedProviderDetails.salon_name}</p>
                </div>
              )}

              {selectedProviderDetails.specialty && (
                <div className="provider-detail-section">
                  <h3>Specialty</h3>
                  <p>{selectedProviderDetails.specialty}</p>
                </div>
              )}

              {selectedProviderDetails.experience && (
                <div className="provider-detail-section">
                  <h3>Experience</h3>
                  <p>{selectedProviderDetails.experience}</p>
                </div>
              )}

              {selectedProviderDetails.specialties && (
                <div className="provider-detail-section">
                  <h3>Specialties</h3>
                  <div className="specialties-tags">
                    {selectedProviderDetails.specialties.map((spec, index) => (
                      <span key={index} className="specialty-tag">{spec}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="provider-detail-section">
                <h3>Rating</h3>
                <p className="modal-rating">⭐ {selectedProviderDetails.rating} / 5.0</p>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-primary" 
                onClick={() => handleSelectProvider(selectedProviderDetails._id)}
              >
                Select This Provider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingForm
