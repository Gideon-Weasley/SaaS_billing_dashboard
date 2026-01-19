# 🚀 Frontend Setup & Running Instructions

## Prerequisites

Ensure you have:
- Node.js 16+ installed
- npm or yarn package manager
- Backend running on `http://localhost:8000`

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Environment Setup

### Required Backend Endpoints

Make sure your backend is running and has these routes:

```
POST   /auth/login             ✅
POST   /auth/register          ✅
POST   /unsubscribe            ✅
GET    /usage/summary          ✅
GET    /usage/monthly          ✅
GET    /invoices               ✅
POST   /payments/pay           ✅
WS     /ws/usage               ✅
```

### API Configuration

The frontend connects to:
```javascript
Base URL: http://localhost:8000
WebSocket: ws://localhost:8000/ws/usage
```

Update in `src/api/api.js` if your backend is on a different URL.

---

## File Structure

```
frontend/
├── src/
│   ├── pages/              # Page components
│   ├── components/         # Reusable components
│   ├── context/            # React context
│   ├── api/                # API calls
│   ├── styles/             # Global styles
│   ├── hooks/              # Custom hooks
│   ├── assets/             # Images, etc
│   ├── App.jsx             # Main app
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite config
└── eslint.config.js        # ESLint config
```

---

## Available Scripts

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## Features to Test

### Registration
1. Go to Login page
2. Click "Register" tab
3. Enter email and password
4. Click "Create Account"
5. Should redirect to Dashboard

### Login
1. Enter your registered email
2. Enter password
3. Click "Login"
4. Should see Dashboard

### Profile
1. Click the blue circle (avatar) in top-right
2. View your email and ID
3. Click "Unsubscribe" to delete account
4. Click "Logout" to sign out

### Dashboard
1. View KPI cards (Usage, %, Remaining, Limit)
2. See Monthly Usage Chart
3. Watch Usage Progress bar
4. Live updates via WebSocket

### Invoices
1. Go to "Invoices" page
2. View all invoices
3. Filter by All/Paid/Pending
4. Click "Pay Now" for pending invoices
5. See statistics

---

## Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

### Backend Connection Failed
- Ensure backend is running on `http://localhost:8000`
- Check backend logs for errors
- Verify API endpoints are available

### WebSocket Not Connecting
- Check backend WebSocket implementation
- Look for errors in browser console
- Verify backend is serving WebSocket on `/ws/usage`

### Build Fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styling Issues
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
- Check CSS files in `src/styles/`

---

## Development Tips

### HMR (Hot Module Replacement)
Changes in the code will automatically reload the browser.

### Console Debugging
- Open DevTools (F12)
- Check Console for errors
- Use Network tab to monitor API calls
- Check WebSocket messages in Network tab

### Testing Different Devices
```bash
# Access from other machines (if on same network)
http://[your-ip]:5173
```

### Performance Profiling
- Open DevTools → Performance tab
- Record user interaction
- Analyze for bottlenecks

---

## Production Deployment

### Build Steps
```bash
npm run build          # Creates dist/ folder
npm run preview        # Test production build locally
```

### Deploy to Server
```bash
# Copy dist/ contents to your web server
# OR use deployment tools like Vercel, Netlify, etc.
```

### Environment Variables
Create `.env` for production:
```
VITE_API_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com/ws
```

Update `src/api/api.js` to use these:
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
```

---

## Performance Optimization

### For Production
```bash
# Build produces optimized bundle
npm run build

# Check bundle size
npm run build -- --report
```

### Assets
- Images in `src/assets/` are automatically optimized
- CSS is minified in production
- JS is code-split and minified

---

## Maintenance

### Updating Dependencies
```bash
npm outdated           # Check for updates
npm update             # Update all packages
npm audit              # Check for vulnerabilities
npm audit fix          # Fix vulnerabilities
```

### Code Quality
```bash
npm run lint           # Run ESLint
npm run lint -- --fix  # Auto-fix issues
```

---

## Useful Links

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Chart.js Docs**: https://www.chartjs.org/
- **Tailwind CSS** (if needed): https://tailwindcss.com/

---

## Support & Issues

### Common Issues

| Issue | Solution |
|-------|----------|
| Blank page | Check console for errors |
| API 404 | Backend not running or wrong port |
| WebSocket failed | Backend WS endpoint not available |
| Styling broken | Clear cache, hard refresh |
| Old code running | Check HMR, restart dev server |

### Getting Help

1. Check browser console for errors
2. Check backend logs
3. Verify all APIs are running
4. Check network requests in DevTools
5. Look at the documentation files

---

## Configuration Files

### vite.config.js
```javascript
// Vite configuration
// Includes React plugin setup
```

### eslint.config.js
```javascript
// ESLint configuration
// Code quality checks
```

### package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

## Next Steps

1. **Start Dev Server**: `npm run dev`
2. **Test Features**: Register, login, use dashboard
3. **Check Styling**: Verify responsive design on mobile
4. **Monitor Logs**: Check browser console for errors
5. **Deploy**: When ready, build and deploy to production

---

## ✨ You're All Set!

The frontend is ready to use. Follow the steps above to get started.

For questions, refer to the comprehensive documentation files:
- `FRONTEND_ENHANCEMENT_SUMMARY.md`
- `FRONTEND_QUICKSTART.md`
- `FRONTEND_ARCHITECTURE.md`
- `FRONTEND_CSS_REFERENCE.md`
- `FRONTEND_CHECKLIST.md`

Happy coding! 🎉

---

**Last Updated**: January 2026
**Version**: 2.0
