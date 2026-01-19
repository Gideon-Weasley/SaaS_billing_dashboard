# Frontend CSS Reference Guide

## CSS Variables (theme.css)

### Color Palette

#### Primary Colors
```css
--primary: #2563eb         /* Main blue */
--primary-light: #60a5fa   /* Lighter blue for hover */
--primary-dark: #1e40af    /* Darker blue for active */
```

#### Status Colors
```css
--success: #22c55e         /* Green - Success */
--success-light: #86efac   /* Light green */
--success-dark: #16a34a    /* Dark green */

--warning: #f59e0b         /* Amber - Warning */
--warning-light: #fbbf24   /* Light amber */
--warning-dark: #d97706    /* Dark amber */

--danger: #ef4444          /* Red - Error */
--danger-light: #fca5a5    /* Light red */
--danger-dark: #dc2626     /* Dark red */
```

#### Background Colors
```css
--bg-dark: #020617         /* Dark background */
--bg-dark-secondary: #0f172a /* Secondary dark */
--bg-light: #f8fafc        /* Light background */
```

#### Text Colors
```css
--text-dark: #0f172a       /* Primary text */
--text-light: #64748b      /* Secondary text */
--text-lighter: #94a3b8    /* Tertiary text */
```

#### UI Elements
```css
--card-bg: #ffffff         /* Card background */
--border: #e2e8f0          /* Light border */
--border-dark: #334155     /* Dark border */
```

---

## Component CSS Classes

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--primary);
  color: white;
}

/* Success Button */
.btn-success {
  background: var(--success);
  color: white;
}

/* Danger Button */
.btn-danger {
  background: var(--danger);
  color: white;
}

/* Secondary Button */
.btn-secondary {
  background: var(--border);
  color: var(--text-dark);
}
```

### Status Badges

```css
/* Paid Status */
.status-paid {
  background: rgba(34, 197, 94, 0.1);  /* Success with 10% opacity */
  color: var(--success-dark);
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}

/* Pending Status */
.status-pending {
  background: rgba(245, 158, 11, 0.1);  /* Warning with 10% opacity */
  color: var(--warning-dark);
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}

/* Failed Status */
.status-failed {
  background: rgba(239, 68, 68, 0.1);  /* Danger with 10% opacity */
  color: var(--danger-dark);
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}
```

### Cards

```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### Tables

```css
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

th {
  background: #f8fafc;
  font-weight: 600;
  color: var(--text-light);
}

tr:hover {
  background: #f8fafc;
}
```

### Forms

```css
input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: inherit;
  font-size: 13px;
  color: var(--text-dark);
  background: white;
  transition: all 0.2s;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

---

## Component-Specific Classes

### Navbar

```css
.navbar {
  background: var(--bg-dark);
  color: white;
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-link {
  background: transparent;
  border: 1px solid var(--border-dark);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.navbar-link:hover {
  background: rgba(37, 99, 235, 0.1);
  border-color: var(--primary);
  color: var(--primary-light);
}

.profile-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-circle:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 16px rgba(37, 99, 235, 0.4);
}
```

### Login Page

```css
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-dark-secondary) 50%, #1e293b 100%);
}

.login-card {
  background: #0b1220;
  padding: 40px;
  border-radius: 16px;
  width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(37, 99, 235, 0.15);
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.login-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: rgba(37, 99, 235, 0.05);
  padding: 6px;
  border-radius: 8px;
}

.login-tab.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.login-button {
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
}
```

### Profile Modal

```css
.profile-modal {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background: var(--card-bg);
  border-radius: 12px;
  width: 380px;
  max-height: 85vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 100;
  animation: slideIn 0.3s ease-out;
}

.profile-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
}

.profile-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 99;
}
```

### KPI Card

```css
.kpi-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border);
  transition: all 0.3s;
}

.kpi-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.kpi-card p {
  color: var(--text-light);
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kpi-card h2 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
}
```

### Progress Bar

```css
.progress-bar {
  background: var(--border);
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease-out;
  position: relative;
}

/* Color variations */
.progress-fill.success {
  background: var(--success);
}

.progress-fill.warning {
  background: var(--warning);
}

.progress-fill.danger {
  background: var(--danger);
}
```

---

## Responsive Breakpoints

```css
/* Extra Small (Mobile) */
@media (max-width: 480px) {
  .login-card {
    width: 100%;
    padding: 32px 20px;
  }
}

/* Small (Mobile) */
@media (max-width: 640px) {
  .navbar {
    padding: 12px 16px;
  }

  .grid-4,
  .grid-3,
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

/* Medium (Tablet) */
@media (max-width: 768px) {
  .invoice-table {
    font-size: 12px;
  }

  .profile-modal {
    position: fixed;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 12px 12px 0 0;
  }

  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large (Desktop) */
@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .invoice-grid {
    grid-template-columns: 2fr 1fr;
  }
}
```

---

## Animation Classes

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-50%) translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateY(-50%) translateX(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Utility */
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}
```

---

## Utility Classes

```css
/* Spacing */
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mt-4 { margin-top: 32px; }

.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 32px; }

/* Flex */
.flex {
  display: flex;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Grid */
.grid {
  display: grid;
  gap: 24px;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
```

---

## Shadow Depths

```css
/* Minimal */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

/* Light */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Medium */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* Heavy */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

/* Deep */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
```

---

## Typography Scale

```css
h1 { font-size: 32px; font-weight: 700; }
h2 { font-size: 24px; font-weight: 700; }
h3 { font-size: 20px; font-weight: 600; }
h4 { font-size: 16px; font-weight: 600; }
p  { font-size: 14px; font-weight: 400; }
small { font-size: 12px; font-weight: 400; }
```

---

**Last Updated**: January 2026
**Version**: 2.0
