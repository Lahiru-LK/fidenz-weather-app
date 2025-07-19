import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/morphAnimations.css';

function App() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      navigate("/dashboard");
    }
  };

  const handleViewWeather = () => {
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      navigate("/dashboard");
    }
  };

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

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 content-smooth">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full p-3 rounded border smooth-morph ${errors.email ? "border-red-500" : "border-gray-300"
                } dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">Please enter your email</p>
            )}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full p-3 rounded border smooth-morph ${errors.password ? "border-red-500" : "border-gray-300"
                } dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">Please enter your password</p>
            )}

            <div className="flex justify-between text-sm text-blue-600 dark:text-blue-400">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold smooth-morph"
            >
              Sign in
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up for free
              </button>
            </p>
          </form>
        </div>

        {/* Right Side - Weather Info */}
        <div
          className={`hidden md:flex md:w-1/2 bg-blue-600 dark:bg-blue-500 text-white flex-col justify-center p-12 rounded-l-3xl relative overflow-hidden bg-smooth-transition smooth-morph`}
          style={{
            backgroundImage: `url(/src/assets/${dark ? 'logbkimg2.png' : 'logbkimg.png'})`,
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