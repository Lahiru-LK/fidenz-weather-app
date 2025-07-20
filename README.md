# fidenz-weather-app

Full Stack Weather Application using Node.js backend and React frontend with Tailwind CSS.  
Integrates OpenWeatherMap API with caching and Auth0 for authentication (Fidenz assignment).

---

## Features

- Weather data for multiple cities (OpenWeatherMap API)
- Responsive UI (desktop & mobile)
- Data caching (5 min) to reduce API calls
- Auth0 authentication (login/logout, MFA, restricted signups)
- Clean code structure (controllers, routes, services, utils)
- Environment variables for secrets

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Auth0 account (for authentication)
- OpenWeatherMap API key

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/fidenz-weather-app.git
cd fidenz-weather-app
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key and Auth0 credentials
npm install
npm start
```

- The backend runs on `http://localhost:5000` by default.

### 3. Frontend Setup

```bash
cd ../frontend
cp .env.example .env
# Edit .env and add your Auth0 credentials
npm install
npm run dev
```

- The frontend runs on `http://localhost:5173` by default.

### 4. Auth0 Configuration

- Create an Auth0 application (Single Page App).
- Set allowed callback URLs to `http://localhost:5173`
- Set allowed logout URLs to `http://localhost:5173`
- Enable Multi-Factor Authentication (MFA) in Auth0 dashboard.
- Disable public signups (only allow pre-registered users).
- Create a test user:  
  Email: careers@fidenz.com  
  Password: Pass#fidenz

### 5. Environment Variables

- See `.env.example` in both `backend` and `frontend` folders for required variables.

---

## Code Structure

````markdown
backend
├── controllers
│   └── weatherController.js
├── middleware
│   └── authMiddleware.js
├── models
│   └── User.js
├── routes
│   └── weatherRoutes.js
├── services
│   └── weatherService.js
├── utils
│   └── apiUtils.js
├── .env.example
├── server.js
└── package.json

frontend
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── Layout
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── Weather
│   │   │   ├── CityWeather.jsx
│   │   │   └── WeatherCard.jsx
│   │   └── Loader.jsx
│   ├── context
│   │   └── AuthContext.jsx
│   ├── hooks
│   │   └── useAuth.js
│   ├── App.jsx
│   ├── main.jsx
│   └── tailwind.config.js
├── .env.example
└── package.json
````
