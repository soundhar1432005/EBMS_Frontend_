import './Home.css'

function Home() {
  const eventCategories = [
    { 
      name: 'Wedding Photography', 
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      customers: '2,500+',
      rating: 4.9,
      reviews: 1850
    },
    { 
      name: 'Bridal Makeup', 
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
      customers: '3,200+',
      rating: 4.8,
      reviews: 2340
    },
    { 
      name: 'Event Catering', 
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
      customers: '1,800+',
      rating: 4.7,
      reviews: 1520
    },
    { 
      name: 'Function Halls', 
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=400&h=300&fit=crop',
      customers: '1,500+',
      rating: 4.9,
      reviews: 1280
    },
    { 
      name: 'Transportation Services', 
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
      customers: '2,100+',
      rating: 4.6,
      reviews: 1650
    },
    { 
      name: 'Event Planning', 
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
      customers: '1,200+',
      rating: 4.8,
      reviews: 980
    }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Online Booking Software for Event & Entertainment Services</h1>
            <p>Powerful scheduling solution designed for photographers, event planners, and entertainment professionals</p>
            <div className="hero-buttons">
              <button className="cta-button primary">Start Free Trial</button>
              <button className="cta-button secondary">Watch Demo</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop" alt="Wedding celebration" />
          </div>
        </div>
      </section>

      <section className="features-preview">
        <div className="container">
          <h2>Everything You Need to Manage Your Bookings</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3>24/7 Online Booking</h3>
              <p>Accept bookings anytime with automated scheduling</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Client Management</h3>
              <p>Keep track of customer history and preferences</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>Analytics & Reports</h3>
              <p>Track performance with detailed insights</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <h3>Payment Processing</h3>
              <p>Secure online payments and invoicing</p>
            </div>
          </div>
        </div>
      </section>

      <section className="industries">
        <div className="container">
          <h2>Trusted by Happy Customers Across All Events</h2>
          <p className="section-subtitle">Seamless booking experience with verified ratings and reviews</p>
          <div className="industries-grid">
            {eventCategories.map((category, index) => (
              <div key={index} className="industry-card">
                <div className="industry-image">
                  <img src={category.image} alt={category.name} />
                  <div className="rating-badge">
                    <span className="star">⭐</span>
                    <span className="rating-value">{category.rating}</span>
                  </div>
                </div>
                <div className="industry-content">
                  <h3>{category.name}</h3>
                  <div className="stats">
                    <p className="customers">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      {category.customers} Happy Customers
                    </p>
                    <p className="reviews">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {category.reviews.toLocaleString()} Reviews
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Book Your Perfect Event?</h2>
          <p>Join 12,000+ happy customers who trust our platform for their special moments</p>
          <div className="cta-stats">
            <div className="stat-item">
              <h3>4.8</h3>
              <p>Average Rating</p>
            </div>
            <div className="stat-item">
              <h3>9,620+</h3>
              <p>Total Reviews</p>
            </div>
            <div className="stat-item">
              <h3>12,300+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
          <button className="cta-button primary large" onClick={() => window.location.href = '/signup'}>
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
