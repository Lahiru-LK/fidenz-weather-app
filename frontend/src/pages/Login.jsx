import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/morphAnimations.css';
import LogBkImg from '../assets/logbkimg.png';
import LogBkImg2 from '../assets/logbkimg2.png';

function App() {
  const [dark, setDark] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

  // Save dark mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithRedirect();
  };

  const handleViewWeather = () => {
    loginWithRedirect();
  };

  // Error state handle කරන්න
  if (error) {
    return (
      <div className={dark ? "dark" : ""}>
        <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-red-500 text-xl mb-4">⚠️ Auth0 Error</div>
            <div className="text-gray-700 dark:text-gray-300 mb-4">
              {error.message}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={dark ? "dark" : ""}>
        <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-xl text-gray-900 dark:text-white">Connecting to Auth0...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className={`flex h-screen overflow-hidden bg-white dark:bg-gray-900 page-load ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left Side - Login */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 relative smooth-morph">
          <div className="absolute top-5 right-5 z-20 smooth-morph">
            <button
              onClick={() => setDark(!dark)}
              className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 smooth-morph shadow-lg"
            >
              {dark ? 
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
                </svg>
                : 
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
                </svg>
              }
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white text-center content-smooth">
            Welcome back to{" "}
            <span className="text-blue-600 dark:text-blue-400">Weather App</span>
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-300 text-center content-smooth">
            Sign in to check your weather dashboard.
          </p>

          {/* Auth0 Login/Signup Buttons */}
          <div className="w-full max-w-sm space-y-4 content-smooth">
            {error && (
              <div className="text-red-500 text-center">{error.message}</div>
            )}
            <button
              type="button"
              onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold smooth-morph mb-2"
            >
              Signup with Auth0
            </button>
            <button
              type="button"
              onClick={() => loginWithRedirect()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold smooth-morph"
            >
              Login with Auth0
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Secure authentication powered by{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Auth0</span>
            </p>
          </div>
        </div>

        {/* Right Side - Weather Info */}
        <div
          className={`hidden md:flex md:w-1/2 bg-blue-600 dark:bg-blue-500 text-white flex-col justify-center p-12 rounded-l-3xl relative overflow-hidden bg-smooth-transition smooth-morph`}
          style={{
            backgroundImage: `url(${dark ? LogBkImg2 : LogBkImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: dark ? 'brightness(0.8) saturate(1.1)' : 'brightness(1) saturate(1)'
          }}
        >
          {/* Smooth overlay for transition */}
          <div className={`absolute inset-0 bg-gradient-to-br smooth-morph ${
            dark 
              ? 'from-indigo-900/40 via-purple-900/25 to-blue-900/35 opacity-100' 
              : 'from-transparent via-transparent to-transparent opacity-0'
          }`}></div>
          
          {/* Content */}
          <div className="relative z-10 content-smooth">
            <h2 className="text-3xl font-bold mb-4">
              Live weather reports with{" "}
              <span className="text-white">real-time updates</span>.
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Get accurate weather forecasts for any city around the world.
              Check temperature, humidity, wind speed and more instantly
              with a clean, responsive dashboard.
            </p>
            <button
              onClick={handleViewWeather}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded w-fit hover:bg-gray-50 smooth-morph"
            >
              View Weather
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-4 text-xs text-white">
        © 2025 Weather App
      </div>
    </div>
  );
}

export default App;