import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './FunctionHallBooking.css'

function FunctionHallBooking() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableHalls, setAvailableHalls] = useState([])
  const [selectedHall, setSelectedHall] = useState(null)
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventLocation: '',
    numberOfGuests: '',
    eventType: '',
    additionalNotes: ''
  })

  const allHalls = [
    {
      id: 1,
      name: 'Grand Ballroom',
      capacity: 500,
      price: 2500,
      amenities: ['Stage', 'Sound System', 'AC', 'Parking'],
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Crystal Hall',
      capacity: 300,
      price: 1800,
      amenities: ['Projector', 'AC', 'Catering Area', 'Parking'],
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Royal Banquet',
      capacity: 400,
      price: 2200,
      amenities: ['Stage', 'Dance Floor', 'AC', 'VIP Lounge'],
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Garden Pavilion',
      capacity: 200,
      price: 1500,
      amenities: ['Outdoor Setup', 'Garden View', 'Lighting', 'Parking'],
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop'
    }
  ]

  useEffect(() => {
    if (selectedDate && selectedTime) {
      checkAvailability()
    }
  }, [selectedDate, selectedTime])

  const checkAvailability = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate, time: selectedTime })
      })

      if (response.ok) {
        const data = await response.json()
        setAvailableHalls(data)
      } else {
        console.error('Failed to check availability')
        setAvailableHalls([])
      }
    } catch (error) {
      console.error('Error checking availability:', error)
      setAvailableHalls([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedHall) {
      alert('Please select a function hall')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to continue')
      navigate('/login')
      return
    }

    const bookingData = {
      booking_type: 'function-hall',
      hall_id: selectedHall.id,
      booking_date: selectedDate,
      booking_time: selectedTime,
      event_location: clientInfo.eventLocation,
      number_of_people: clientInfo.numberOfGuests,
      notes: clientInfo.additionalNotes,
      client_name: clientInfo.name,
      client_email: clientInfo.email,
      client_phone: clientInfo.phone,
      total_price: selectedHall.price,
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Function hall booking confirmed successfully!')
        navigate('/dashboard')
      } else {
        alert(data.error || 'Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Network error. Please try again.')
    }
  }

  return (
    <div className="function-hall-page">
      <div className="function-hall-container">
        <h1>Function Hall Booking</h1>

        <div className="date-time-selector">
          <h2>Select Date & Time</h2>
          <div className="selector-row">
            <div className="selector-group">
              <label>Event Date *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="selector-group">
              <label>Event Time *</label>
              <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                <option value="">Select Time Slot</option>
                <option value="morning">Morning (6 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 12 AM)</option>
                <option value="fullday">Full Day</option>
              </select>
            </div>
          </div>
        </div>

        {selectedDate && selectedTime && (
          <>
            <div className="available-halls">
              <h2>Available Function Halls</h2>
              {availableHalls.length === 0 ? (
                <p className="no-halls">No halls available for the selected date and time. Please choose another slot.</p>
              ) : (
                <div className="halls-grid">
                  {availableHalls.map((hall) => (
                    <div
                      key={hall.id}
                      className={`hall-card ${selectedHall?.id === hall.id ? 'selected' : ''}`}
                      onClick={() => setSelectedHall(hall)}
                    >
                      <div className="hall-image">
                        <img src={hall.image} alt={hall.name} />
                      </div>
                      <div className="hall-info">
                        <h3>{hall.name}</h3>
                        <p className="capacity">Capacity: {hall.capacity} guests</p>
                        <p className="price">${hall.price} / {selectedTime === 'fullday' ? 'Full Day' : 'Session'}</p>
                        <div className="amenities">
                          {hall.amenities.map((amenity, index) => (
                            <span key={index} className="amenity-tag">{amenity}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedHall && (
              <form onSubmit={handleSubmit} className="booking-details-form">
                <h2>Client Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Event Location Address *</label>
                    <input
                      type="text"
                      value={clientInfo.eventLocation}
                      onChange={(e) => setClientInfo({ ...clientInfo, eventLocation: e.target.value })}
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Number of Guests *</label>
                    <input
                      type="number"
                      value={clientInfo.numberOfGuests}
                      onChange={(e) => setClientInfo({ ...clientInfo, numberOfGuests: e.target.value })}
                      max={selectedHall.capacity}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Type *</label>
                    <select
                      value={clientInfo.eventType}
                      onChange={(e) => setClientInfo({ ...clientInfo, eventType: e.target.value })}
                      required
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="conference">Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea
                    value={clientInfo.additionalNotes}
                    onChange={(e) => setClientInfo({ ...clientInfo, additionalNotes: e.target.value })}
                    rows="4"
                    placeholder="Any special requirements..."
                  />
                </div>

                <div className="booking-summary">
                  <h3>Booking Summary</h3>
                  <p><strong>Hall:</strong> {selectedHall.name}</p>
                  <p><strong>Date:</strong> {selectedDate}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p className="total-price"><strong>Total Price:</strong> ${selectedHall.price}</p>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FunctionHallBooking
