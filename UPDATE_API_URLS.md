# API URL Update Instructions

All frontend files need to import and use the API_URL from config/api.js instead of hardcoded localhost URLs.

## Files Updated:
✅ AdminLogin.jsx
✅ Login.jsx  
✅ SignUp.jsx
✅ ProviderLogin.jsx
✅ ProviderSignUp.jsx

## Files Still Need Updating:
- ServiceProviders.jsx (2 instances)
- Dashboard.jsx (2 instances)
- BookingForm.jsx (2 instances)
- FunctionHallBooking.jsx (2 instances)
- ProviderDashboard.jsx (3 instances)
- AdminDashboard.jsx (15+ instances)

## Pattern to Follow:

### 1. Add import at top:
```javascript
import { API_URL } from '../config/api'
```

### 2. Replace all instances of:
```javascript
'http://localhost:5000'
```

### With:
```javascript
`${API_URL}`
```

### Example:
Before:
```javascript
const response = await fetch('http://localhost:5000/api/admin/stats', {
```

After:
```javascript
const response = await fetch(`${API_URL}/api/admin/stats`, {
```

### For image URLs:
Before:
```javascript
<img src={`http://localhost:5000${provider.shop_logo}`} />
```

After:
```javascript
<img src={`${API_URL}${provider.shop_logo}`} />
```

## Quick Fix Command (if using VS Code):
1. Open each file
2. Find: `http://localhost:5000`
3. Replace with: `${API_URL}`
4. Add import at top if not present
