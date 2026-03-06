import './Features.css'

function Features() {
  const features = [
    {
      title: 'Online Booking Widget',
      description: 'Embed a customizable booking widget on your website. Let clients book services 24/7 without phone calls.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop'
    },
    {
      title: 'Calendar Synchronization',
      description: 'Sync with Google Calendar, Outlook, and iCal. Manage all your appointments in one place.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop'
    },
    {
      title: 'Automated Reminders',
      description: 'Send automatic SMS and email reminders to clients. Reduce no-shows by up to 90%.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop'
    },
    {
      title: 'Payment Processing',
      description: 'Accept online payments, deposits, and tips. Integrated with Stripe, PayPal, and Square.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop'
    },
    {
      title: 'Client Management',
      description: 'Store client information, booking history, and preferences. Build lasting relationships.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
    },
    {
      title: 'Staff Management',
      description: 'Manage multiple staff members, their schedules, and service assignments effortlessly.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track revenue, popular services, and booking trends. Make data-driven decisions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
      title: 'Mobile App',
      description: 'Manage bookings on the go with iOS and Android apps. Stay connected anywhere.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop'
    },
    {
      title: 'Custom Branding',
      description: 'White-label solution with your logo, colors, and domain. Maintain your brand identity.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop'
    }
  ]

  return (
    <div className="features">
      <div className="features-hero">
        <h1>Complete Booking Management Solution</h1>
        <p className="features-subtitle">Everything you need to run your event and entertainment business efficiently</p>
      </div>

      <div className="features-container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-image">
                <img src={feature.image} alt={feature.title} />
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="features-cta">
        <h2>Ready to streamline your booking process?</h2>
        <button className="cta-btn">Start Your Free Trial</button>
      </div>
    </div>
  )
}

export default Features
