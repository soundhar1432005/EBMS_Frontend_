import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ServiceProviders.css'

function ServiceProviders() {
  const navigate = useNavigate()
  const [providers, setProviders] = useState([])
  const [filteredProviders, setFilteredProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState('all')

  const serviceTypes = [
    { value: 'all', label: 'All Services' },
    { value: 'photoshoot', label: 'Photography Services' },
    { value: 'bridal-makeup', label: 'Bridal Makeup' },
    { value: 'catering', label: 'Catering Services' },
    { value: 'cab-bookings', label: 'Transportation Services' }
  ]

  useEffect(() => {
    fetchProviders()
  }, [])

  useEffect(() => {
    if (selectedService === 'all') {
      setFilteredProviders(providers)
    } else {
      setFilteredProviders(providers.filter(p => p.service_type === selectedService))
    }
  }, [selectedService, providers])

  const fetchProviders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/providers/approved')
      const data = await response.json()
      setProviders(data)
      setFilteredProviders(data)
    } catch (error) {
      console.error('Error fetching providers:', error)
    } finally {
      setLoading(false)
    }
  }

  const getServiceLabel = (type) => {
    const service = serviceTypes.find(s => s.value === type)
    return service ? service.label : type
  }

  const handleBookNow = (provider) => {
    navigate(`/bookings/${provider.service_type}`, { state: { provider } })
  }

  if (loading) {
    return (
      <div className="providers-container">
        <div className="loading">Loading service providers...</div>
      </div>
    )
  }

  return (
    <div className="providers-container">
      <div className="providers-header">
        <h1>Service Providers</h1>
        <p>Browse and book from our verified service providers</p>
      </div>

      <div className="filter-section">
        <label>Filter by Service:</label>
        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
          {serviceTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {filteredProviders.length === 0 ? (
        <div className="no-providers">
          <p>No service providers available at the moment.</p>
        </div>
      ) : (
        <div className="providers-grid">
          {filteredProviders.map(provider => (
            <div key={provider._id} className="provider-card">
              {provider.shop_logo && (
                <div className="provider-logo">
                  <img src={`http://localhost:5000${provider.shop_logo}`} alt={provider.business_name} />
                </div>
              )}
              
              <div className="provider-info">
                <h3>{provider.business_name}</h3>
                <span className="service-badge">{getServiceLabel(provider.service_type)}</span>
                
                {provider.specialty && (
                  <p className="specialty">{provider.specialty}</p>
                )}
                
                <div className="provider-details">
                  <div className="detail-item">
                    <strong>Contact:</strong> {provider.contact_number}
                  </div>
                  {provider.email && (
                    <div className="detail-item">
                      <strong>Email:</strong> {provider.email}
                    </div>
                  )}
                  {provider.shop_location && (
                    <div className="detail-item">
                      <strong>Location:</strong> {provider.shop_location}
                    </div>
                  )}
                  {provider.studio_name && (
                    <div className="detail-item">
                      <strong>Studio:</strong> {provider.studio_name}
                    </div>
                  )}
                  {provider.salon_name && (
                    <div className="detail-item">
                      <strong>Salon:</strong> {provider.salon_name}
                    </div>
                  )}
                </div>

                <button 
                  className="book-btn"
                  onClick={() => handleBookNow(provider)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceProviders
