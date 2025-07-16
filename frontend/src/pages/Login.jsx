import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

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
      <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900">
        {/* Left Side - Login */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
          <div className="absolute top-5 right-5">
            <button
              onClick={() => setDark(!dark)}
              className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Welcome back to{" "}
            <span className="text-blue-600 dark:text-blue-400">Weather App</span>
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Sign in to check your weather dashboard.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full p-3 rounded border ${errors.email ? "border-red-500" : "border-gray-300"
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
              className={`w-full p-3 rounded border ${errors.password ? "border-red-500" : "border-gray-300"
                } dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">Please enter your password</p>
            )}

            <div className="flex justify-between text-sm text-blue-600 dark:text-blue-400">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold"
            >
              Sign in
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up for free
              </button>
            </p>
          </form>
        </div>

        {/* Right Side - Weather Info */}
        <div
          className="hidden md:flex md:w-1/2 bg-blue-600 dark:bg-blue-500 text-white flex-col justify-center p-12 rounded-l-3xl"
          style={{
            backgroundImage: 'url(/src/assets/logbkimg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          
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
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded w-fit hover:bg-gray-50"
          >
            View Weather
          </button>
        </div>
      </div>

      <div className="absolute bottom-2 right-4 text-xs text-white">
        © 2025 Weather App
      </div>
    </div>
  );
}

export default App;