import './Pricing.css'

function Pricing() {
  const paymentOptions = [
    {
      name: 'Full Payment',
      icon: '💳',
      description: 'Pay the complete amount upfront',
      features: [
        'No additional charges',
        'Instant booking confirmation',
        'Best value for money',
        'All services included'
      ],
      discount: '5% Discount',
      recommended: false
    },
    {
      name: 'EMI Option',
      icon: '📊',
      description: 'Pay in easy monthly installments',
      features: [
        '3, 6, or 12 months EMI',
        'Zero down payment available',
        'Flexible payment schedule',
        'No hidden charges',
        'Instant approval'
      ],
      discount: 'Starting from ₹2,000/month',
      recommended: true
    },
    {
      name: 'Pay Later',
      icon: '⏰',
      description: 'Book now and pay within 30 days',
      features: [
        'Reserve your date instantly',
        'Pay within 30 days',
        'No interest charges',
        'Flexible payment methods',
        'Secure transactions'
      ],
      discount: 'Interest Free',
      recommended: false
    }
  ]

  return (
    <div className="pricing">
      <h1>Flexible Payment Options</h1>
      <p className="pricing-subtitle">Choose the payment method that works best for you</p>
      
      <div className="payment-info">
        <div className="info-card">
          <h3>💰 Accepted Payment Methods</h3>
          <p>Credit Card • Debit Card • UPI • Net Banking • Wallets</p>
        </div>
        <div className="info-card">
          <h3>🔒 100% Secure Payments</h3>
          <p>Your payment information is encrypted and secure</p>
        </div>
        <div className="info-card">
          <h3>✅ Instant Confirmation</h3>
          <p>Get booking confirmation immediately after payment</p>
        </div>
      </div>

      <div className="pricing-grid">
        {paymentOptions.map((option, index) => (
          <div key={index} className={`pricing-card ${option.recommended ? 'popular' : ''}`}>
            {option.recommended && <span className="popular-badge">Most Popular</span>}
            <div className="card-icon">{option.icon}</div>
            <h2>{option.name}</h2>
            <p className="card-description">{option.description}</p>
            <div className="discount-badge">{option.discount}</div>
            <ul className="features">
              {option.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
            <button className="select-plan-btn">Choose This Option</button>
          </div>
        ))}
      </div>

      <div className="pricing-footer">
        <h3>Need Help Choosing?</h3>
        <p>Our team is here to help you select the best payment option for your needs.</p>
        <button className="contact-btn">Contact Support</button>
      </div>
    </div>
  )
}

export default Pricing
