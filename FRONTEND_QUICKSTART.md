# Quick Start Guide - Enhanced Frontend

## 🚀 Getting Started

### 1. Start the Frontend
```bash
cd frontend
npm run dev
```
The app will open at `http://localhost:5173`

### 2. First Time - Create Account
- Click **"Register"** tab on login page
- Enter email and password (min 6 chars)
- Click **"Create Account"**

### 3. Existing Users - Login
- Enter your email and password
- Click **"Login"**

## 📍 Navigation

### Navbar (Top)
- **💳 SaaS Billing** - Click to stay on dashboard
- **📊 Dashboard** - View usage and KPIs
- **📄 Invoices** - Manage invoices
- **User Circle (Top Right)** - Access profile menu

## 👤 Profile Menu

Click the **blue circle** (user avatar) in top-right to:
- View your email and user ID
- **Unsubscribe** - Delete your account
- **Logout** - Sign out

⚠️ **Note**: Cannot unsubscribe if you have pending payments!

## 📊 Dashboard Features

### KPI Cards (4 Cards)
- **Total Usage** - Your total usage units
- **Used %** - Percentage of plan used
- **Remaining** - Remaining units
- **Plan Limit** - Your monthly limit

### Monthly Usage Chart
- Bar chart showing usage by month
- Hover for exact values

### Usage Progress
- Visual progress bar
- Stats display
- Color-coded warnings:
  - 🟢 Green: Under 50%
  - 🟡 Yellow: 50-80%
  - 🔴 Red: Over 80%

## 📄 Invoices Page

### Statistics
- **Total Invoices** - All invoices count
- **Paid** - Completed payments
- **Pending** - Awaiting payment

### Filters
- **All** - View all invoices
- **Paid** - View paid invoices only
- **Pending** - View pending invoices only

### Actions
- **Pay Now** - Process payment for pending invoice
- Status badges show payment state

## 🎨 UI Features

### Responsive Design
- **Desktop** - Full 4-column grid for KPIs
- **Tablet** - 2-column layout
- **Mobile** - Single column, full width

### Interactive Elements
- Smooth hover effects
- Loading indicators
- Error messages
- Confirmation dialogs

## 🔧 Troubleshooting

### "Invalid email or password"
- Check spelling of email
- Ensure password is correct
- Password is case-sensitive

### "User already exists"
- Email is already registered
- Try logging in instead
- Use "Forgot Password" if needed (future feature)

### "Cannot unsubscribe: pending payments exist"
- Pay all pending invoices first
- Then unsubscribe

### WebSocket not updating
- Check backend is running
- Ensure WebSocket URL is correct in `api.js`
- Browser console may show connection errors

## 📱 Mobile Tips

- Profile modal slides up from bottom
- All buttons are touch-friendly (44px minimum)
- Tables scroll horizontally on small screens
- Use filters to view data on small screens

## 🔑 Keyboard Shortcuts

- **Tab** - Navigate between inputs
- **Enter** - Submit forms, click buttons
- **Escape** - Close profile modal

## 📞 Support

Check backend logs if:
- API calls fail
- Registration doesn't work
- Invoices don't load
- Payment processing fails

Backend URL: `http://localhost:8000`

---

**Last Updated**: January 2026
**Version**: 2.0 (Enhanced)
