import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../config/api'
import './ProviderSignUp.css'

function ProviderSignUp() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    business_name: '',
    service_type: '',
    business_email: '',
    contact_number: '',
    contact_number_2: '',
    contact_number_3: '',
    shop_location: '',
    studio_name: '',
    salon_name: '',
    specialty: '',
    shop_logo: null
  })
  const [logoPreview, setLogoPreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const serviceTypes = [
    { value: 'photoshoot', label: 'Photography Services' },
    { value: 'bridal-makeup', label: 'Bridal Makeup' },
    { value: 'catering', label: 'Catering Services' },
    { value: 'cab-bookings', label: 'Transportation Services' }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Logo file size should be less than 2MB')
        return
      }
      setFormData({ ...formData, shop_logo: file })
      setLogoPreview(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    setError('')
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!formData.service_type) {
      setError('Please select a service type')
      setLoading(false)
      return
    }

    try {
      const submitData = new FormData()
      
      Object.keys(formData).forEach(key => {
        if (formData[key] && key !== 'shop_logo') {
          submitData.append(key, formData[key])
        }
      })
      
      if (formData.shop_logo) {
        submitData.append('shop_logo', formData.shop_logo)
      }

      const response = await fetch(`${API_URL}/api/auth/register/provider`, {
        method: 'POST',
        body: submitData,
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration successful! Please wait for admin approval.')
        navigate('/login/provider')
      } else {
        setError(data.error || 'Registration failed. Please try again.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="provider-signup-container">
      <div className="provider-signup-card">
        <div className="signup-header">
          <h1>Create Provider Account</h1>
          <p>Join our platform and connect with clients</p>
        </div>

        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-circle">1</div>
            <span>Personal Info</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-circle">2</div>
            <span>Business Details</span>
          </div>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {step === 1 && (
          <form onSubmit={handleNext} className="signup-form">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <button type="submit" className="btn-next">
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label>Service Type</label>
              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                required
              >
                <option value="">Choose your service</option>
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Business Name</label>
              <input
                type="text"
                name="business_name"
                placeholder="Your business or studio name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Business Email</label>
              <input
                type="email"
                name="business_email"
                placeholder="business@example.com"
                value={formData.business_email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Business Logo (Optional)</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  id="logo"
                  hidden
                />
                <label htmlFor="logo" className="file-label">
                  {logoPreview ? (
                    <div className="preview-container">
                      <img src={logoPreview} alt="Preview" />
                      <span>Click to change</span>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Upload Logo</span>
                      <small>Max 2MB (JPG, PNG, GIF)</small>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Primary Contact</label>
                <input
                  type="tel"
                  name="contact_number"
                  placeholder="Primary number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Secondary Contact</label>
                <input
                  type="tel"
                  name="contact_number_2"
                  placeholder="Optional"
                  value={formData.contact_number_2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Additional Contact (Optional)</label>
              <input
                type="tel"
                name="contact_number_3"
                placeholder="Additional number"
                value={formData.contact_number_3}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Business Address</label>
              <textarea
                name="shop_location"
                placeholder="Enter your complete business address"
                value={formData.shop_location}
                onChange={handleChange}
                required
                rows="3"
              />
            </div>

            {formData.service_type === 'photoshoot' && (
              <div className="input-group">
                <label>Studio Name (Optional)</label>
                <input
                  type="text"
                  name="studio_name"
                  placeholder="If different from business name"
                  value={formData.studio_name}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.service_type === 'bridal-makeup' && (
              <div className="input-group">
                <label>Salon Name (Optional)</label>
                <input
                  type="text"
                  name="salon_name"
                  placeholder="If different from business name"
                  value={formData.salon_name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="input-group">
              <label>Specialty (Optional)</label>
              <input
                type="text"
                name="specialty"
                placeholder="e.g., Wedding Photography, Bridal Makeup"
                value={formData.specialty}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button type="button" onClick={handleBack} className="btn-back">
                Back
              </button>
              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login/provider">Sign In</Link></p>
          <p>Looking to book services? <Link to="/signup/client">Register as Client</Link></p>
        </div>
      </div>
    </div>
  )
}

export default ProviderSignUp
