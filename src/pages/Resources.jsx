import './Resources.css'

function Resources() {
  return (
    <div className="resources">
      <div className="resources-hero">
        <h1>Resources & Support</h1>
        <p>Everything you need to succeed with our platform</p>
      </div>

      <div className="resources-container">
        <div className="resources-grid">
          <div className="resource-card">
            <div className="resource-image">
              <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop" alt="Help Center" />
            </div>
            <div className="resource-content">
              <h2>Help Center</h2>
              <p>Find answers to common questions and learn how to use our platform effectively</p>
              <button className="resource-btn">Visit Help Center</button>
            </div>
          </div>
          
          <div className="resource-card">
            <div className="resource-image">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop" alt="YouTube Channel" />
            </div>
            <div className="resource-content">
              <h2>YouTube Channel</h2>
              <p>Watch step-by-step video guides on how to maximize your bookings and revenue</p>
              <a href="https://youtube.com/@yourstudio" target="_blank" rel="noopener noreferrer">
                <button className="resource-btn">Visit YouTube</button>
              </a>
            </div>
          </div>
          
          <div className="resource-card">
            <div className="resource-image">
              <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop" alt="Instagram" />
            </div>
            <div className="resource-content">
              <h2>Instagram</h2>
              <p>Follow us for daily tips, inspiration, and updates on our services</p>
              <a href="https://instagram.com/yourstudio" target="_blank" rel="noopener noreferrer">
                <button className="resource-btn">Follow on Instagram</button>
              </a>
            </div>
          </div>
          
          <div className="resource-card">
            <div className="resource-image">
              <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" alt="Getting Started" />
            </div>
            <div className="resource-content">
              <h2>Getting Started Guide</h2>
              <p>Complete guide on setting up your booking system and going live</p>
              <button className="resource-btn">Read Guide</button>
            </div>
          </div>
        </div>
      </div>

      <section className="how-it-works">
        <div className="container">
          <h2>How the Booking System Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Your Account</h3>
              <p>Sign up and set up your business profile in minutes</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Add Your Services</h3>
              <p>Configure your services, pricing, and availability</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Share Your Link</h3>
              <p>Share your booking page with customers via website or social media</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Manage Bookings</h3>
              <p>Accept bookings and manage your schedule from anywhere</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Resources
